import chokidar, { FSWatcher } from 'chokidar';
import { join } from 'path';
import { isComponentFile, analyzeComponent } from './component-analyzer.js';

export interface WatcherOptions {
  uiDirectory: string;
  onComponentCreated: (componentPath: string) => Promise<void>;
  onComponentChanged?: (componentPath: string) => Promise<void>;
}

export class FileWatcher {
  private watcher: FSWatcher | null = null;
  private options: WatcherOptions;

  constructor(options: WatcherOptions) {
    this.options = options;
  }

  /**
   * Starts watching the UI directory for new components
   */
  start(): void {
    if (this.watcher) {
      return; // Already watching
    }

    const watchPath = join(this.options.uiDirectory, '**/*.{tsx,jsx}');

    this.watcher = chokidar.watch(watchPath, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true, // Don't trigger for existing files
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    });

    this.watcher
      .on('add', async (path: string) => {
        if (isComponentFile(path)) {
          console.error(`[FileWatcher] New component detected: ${path}`);
          try {
            const info = await analyzeComponent(path);

            // Only process if component doesn't have stories/tests yet
            if (!info.hasStories || !info.hasTests || !info.hasDocs) {
              await this.options.onComponentCreated(path);
            }
          } catch (error: any) {
            console.error(`[FileWatcher] Error processing component: ${error}`);
          }
        }
      })
      .on('change', async (path: string) => {
        if (isComponentFile(path) && this.options.onComponentChanged) {
          console.error(`[FileWatcher] Component changed: ${path}`);
          await this.options.onComponentChanged(path);
        }
      })
      .on('error', (error: unknown) => {
        console.error(`[FileWatcher] Error: ${error}`);
      });

    console.error(`[FileWatcher] Started watching: ${watchPath}`);
  }

  /**
   * Stops watching the directory
   */
  async stop(): Promise<void> {
    if (this.watcher) {
      await this.watcher.close();
      this.watcher = null;
      console.error('[FileWatcher] Stopped watching');
    }
  }

  /**
   * Checks if the watcher is currently active
   */
  isWatching(): boolean {
    return this.watcher !== null;
  }
}
