import crypto from 'crypto';
import { config } from '../config/index.js';
import { documentRepository } from '../repositories/documentRepository.js';

export class AuditService {
  /**
   * Generate cryptographic digital signature stamp for approved documents
   */
  generateDigitalSignature(docId, userRole, timestamp) {
    const payload = `${docId}|${userRole}|${timestamp}|${config.crypto.secretKey}`;
    const hash = crypto.createHmac('sha256', config.crypto.secretKey)
      .update(payload)
      .digest('hex')
      .substring(0, 16)
      .toUpperCase();
    return `KMRL-SHA256-${hash}`;
  }

  /**
   * Record audit event log into persistent repository
   */
  async logEvent(docId, userRole, action, signatureHash, details) {
    return await documentRepository.addAuditLog({
      docId,
      userRole,
      action,
      signatureHash: signatureHash || `STAMP-${crypto.randomUUID().substring(0, 8).toUpperCase()}`,
      details
    });
  }

  /**
   * Get all audit trails
   */
  async getAuditLogs() {
    return await documentRepository.getAuditLogs();
  }
}

export const auditService = new AuditService();
