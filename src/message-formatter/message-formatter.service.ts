export class MessageFormatterService {

    format(message: string) {
        const timestamp = new Date().toISOString();
        console.log(timestamp);
        return `[${timestamp}] ${message}`;
    }
}
