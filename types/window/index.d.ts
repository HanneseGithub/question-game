interface Window {
    components: {
        [key: string]: string;
    };
    componentSettings: IComponentSettings;
}

interface IComponentSettings {
    className: string;
    context: {
        [key: string]: React.ReactNode;
    };
    parseJsxFrom?: string[];
}

declare var window: Window;
