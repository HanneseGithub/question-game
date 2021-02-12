declare global {
    interface Window {
        components: {
            [key: string]: string;
        };
        componentSettings: IComponentSettings;
        ssr: boolean;
    }

    interface IContext {
        [key: string]: React.ReactNode;
    }

    interface IComponentSettings {
        className: string;
        context: IContext;
        parseJsxFrom?: string[];
    }
}

// There must be at least one import or export for the file to be treated as a module
export {};
