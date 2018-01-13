interface IgotoAndPlay {
    version: string;
    templatePath: string;
    ajaxPath: string;
    svgPath: string;
    cookiePath: string;
    cookieDomain: string;
    nonce: string;
    loggedIn: boolean;
    headerOffset: number;
}

declare const gotoAndPlay: IgotoAndPlay;
