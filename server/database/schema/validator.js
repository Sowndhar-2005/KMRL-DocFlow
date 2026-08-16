import { SCHEMAS } from './definitions.js';
import { ValidationError } from '../../errors/index.js';

export class SchemaValidator {
  /**
   * Validate a single record against its table schema definition
   */
  static validate(tableName, record, isUpdate = false) {
    const schema = SCHEMAS[tableName];
    if (!schema) {
      throw new ValidationError(`Unknown table: ${tableName}`);
    }

    const errors = [];

    // Check required fields (for inserts)
    if (!isUpdate) {
      for (const [field, rule] of Object.entries(schema.fields)) {
        if (rule.required && (record[field] === undefined || record[field] === null || record[field] === '')) {
          errors.push(`Field '${field}' is required on table '${tableName}'`);
        }
      }
    }

    // Check field types and constraints
    for (const [field, value] of Object.entries(record)) {
      const rule = schema.fields[field];
      if (!rule) continue; // Allow extra semi-structured fields for flexibility

      if (value !== undefined && value !== null) {
        if (rule.type === 'string' && typeof value !== 'string') {
          errors.push(`Field '${field}' must be a string, received ${typeof value}`);
        } else if (rule.type === 'number' && typeof value !== 'number') {
          errors.push(`Field '${field}' must be a number, received ${typeof value}`);
        }

        if (rule.enum && !rule.enum.includes(value)) {
          errors.push(`Field '${field}' value '${value}' is not valid. Allowed: ${rule.enum.join(', ')}`);
        }

        if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
          errors.push(`Field '${field}' value '${value}' does not match required pattern`);
        }

        if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
          errors.push(`Field '${field}' must be at least ${rule.minLength} characters`);
        }
      }
    }

    if (errors.length > 0) {
      throw new ValidationError(`Schema validation error for table '${tableName}'`, { errors });
    }

    return true;
  }

  /**
   * Validate foreign key integrity across tables
   */
  static validateForeignKeys(tableName, record, databaseState) {
    const schema = SCHEMAS[tableName];
    if (!schema || !schema.foreignKeys) return true;

    for (const [fkField, fkRule] of Object.entries(schema.foreignKeys)) {
      const fkValue = record[fkField];
      if (fkValue) {
        const targetTableRecords = databaseState[fkRule.targetTable] || [];
        const exists = targetTableRecords.some(r => r[fkRule.targetField] === fkValue);
        if (!exists) {
          throw new ValidationError(
            `Foreign key constraint violation: '${fkField}' value '${fkValue}' does not exist in target table '${fkRule.targetTable}.${fkRule.targetField}'`
          );
        }
      }
    }
    return true;
  }
}
