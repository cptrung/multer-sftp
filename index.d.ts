import * as ssh2 from 'ssh2';
import * as Multer from 'multer';

interface SFTPStorageOptions {
  sftp: ssh2.ConnectConfig;
  destination?: string | ((
    req: Request,
    file: Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => void);
  filename?(
    req: Request,
    file: Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void;
}

declare global {
  namespace Express {
    namespace MulterSFTP {
      interface File extends Multer.File { }
    }
  }
}

interface SFTPStorage {
  (options?: SFTPStorageOptions): Multer.StorageEngine;
}

declare const sftpStorage: SFTPStorage;
export = sftpStorage;
