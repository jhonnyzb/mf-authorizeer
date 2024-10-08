export abstract class GtmDispatchEventsRepository {
    abstract sendEvent(event: any): void;
}