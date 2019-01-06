declare module 'elios-sdk' {

    export interface Module {

        /**
         * Define what lowest version of the mirror your module need
         */
        readonly requireVersion: string;

        /**
         * Define if you want to show module in account loading message
         */
        readonly showOnStart: boolean;

        /**
         * Called when module was loaded
         */
        init: () => void;

        /**
         * Will be called when module need to be started
         */
        start: () => void;

        /**
         * Will be called when module need to be stopped
         */
        stop: () => void;
    }

    export interface Widget {
        id: string;
        html: BehaviorSubject<string>;
    }

    export interface Controller {
        createWidget(args: {}): Widget;
    }
}

/**
 * @class BehaviorSubject<T>
 */
declare class BehaviorSubject<T> {
    next(value: T): void;
}