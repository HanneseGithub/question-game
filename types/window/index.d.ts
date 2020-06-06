interface Window {
    components: {
        [key: string]: string;
    };
    componentSettings: IComponentSettings;
}

interface IContext {
    [key: string]: React.ReactNode;
}

interface IComponentSettings {
    className: string;
    context: IContext;
    parseJsxFrom?: string[];
}

declare let window: Window;
