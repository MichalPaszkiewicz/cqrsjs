declare module EventReplayer {
    class EventReplayerService {
        private static _instance;
        static Instance: EventReplayerService;
        clearCurrentState(): void;
        replayAll(callback: () => void): void;
        replayTo(time: Date, callback: () => void): void;
    }
}
