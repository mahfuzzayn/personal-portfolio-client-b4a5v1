/* eslint-disable @typescript-eslint/no-unused-vars */

export const validateImage = async (url: string) => {
    try {
        const response = await fetch(url, { method: "HEAD" });
        
        return response.ok;
    } catch (error) {
        return false;
    }
};
