
export const CopyToClipboard = (text: string) => {
    if(text) {
     navigator.clipboard.writeText(text);
     return true;
    }
};
