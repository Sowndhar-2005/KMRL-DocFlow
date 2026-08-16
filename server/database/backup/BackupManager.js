import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from '../../config/index.js';

export class BackupManager {
  constructor(engine) {
    this.engine = engine;
    this.backupDir = path.join(config.dataDir, 'backups');
    this.maxBackups = 10;
  }

  async init() {
    await fsPromises.mkdir(this.backupDir, { recursive: true });
  }

  /**
   * Create an automated timestamped snapshot backup with SHA-256 integrity hash
   */
  async createSnapshot(label = 'AUTO_SNAPSHOT') {
    await this.init();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `kmrl_backup_${label}_${timestamp}.json`;
    const filepath = path.join(this.backupDir, filename);

    const state = this.engine.getState();
    const payload = JSON.stringify(state, null, 2);
    
    // Calculate SHA-256 Checksum
    const checksum = crypto.createHash('sha256').update(payload).digest('hex');

    const backupMetadata = {
      filename,
      filepath,
      createdAt: new Date().toISOString(),
      label,
      checksum,
      documentsCount: state.documents?.length || 0,
      sizeBytes: Buffer.byteLength(payload, 'utf8')
    };

    const fileContent = JSON.stringify({ metadata: backupMetadata, data: state }, null, 2);
    await fsPromises.writeFile(filepath, fileContent, 'utf-8');

    // Run rotation cleanup
    await this._rotateBackups();

    return backupMetadata;
  }

  /**
   * List all available snapshots with integrity status
   */
  async listSnapshots() {
    await this.init();
    const files = await fsPromises.readdir(this.backupDir);
    const backups = [];

    for (const f of files) {
      if (f.endsWith('.json')) {
        const fullPath = path.join(this.backupDir, f);
        try {
          const content = await fsPromises.readFile(fullPath, 'utf-8');
          const parsed = JSON.parse(content);
          if (parsed.metadata) {
            backups.push(parsed.metadata);
          }
        } catch (e) {
          // ignore corrupted temp files
        }
      }
    }

    backups.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return backups;
  }

  /**
   * Point-In-Time-Recovery (PITR) Restore from snapshot
   */
  async restoreSnapshot(filename) {
    await this.init();
    const filepath = path.join(this.backupDir, filename);
    if (!fs.existsSync(filepath)) {
      throw new Error(`Backup file '${filename}' does not exist.`);
    }

    const content = await fsPromises.readFile(filepath, 'utf-8');
    const parsed = JSON.parse(content);
    
    // Verify Checksum before restore
    const payload = JSON.stringify(parsed.data, null, 2);
    const computedChecksum = crypto.createHash('sha256').update(payload).digest('hex');
    
    if (parsed.metadata?.checksum && computedChecksum !== parsed.metadata.checksum) {
      throw new Error('Integrity verification failed: Backup checksum mismatch!');
    }

    await this.engine.applyCommittedState(parsed.data);
    return {
      success: true,
      restoredFrom: filename,
      restoredAt: new Date().toISOString(),
      documentsRestored: parsed.data.documents?.length || 0
    };
  }

  async _rotateBackups() {
    try {
      const snapshots = await this.listSnapshots();
      if (snapshots.length > this.maxBackups) {
        const toDelete = snapshots.slice(this.maxBackups);
        for (const snap of toDelete) {
          await fsPromises.unlink(snap.filepath).catch(() => {});
        }
      }
    } catch (err) {
      console.warn('[BackupManager] Rotation error:', err);
    }
  }
}
