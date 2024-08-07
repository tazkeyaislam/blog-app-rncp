export class GlobalConstants {
    // static error(responseMessage: any, error: any) {
    //     throw new Error('Method not implemented.');
    // }

    //Message
    public static genericError: string = "Something went wrong.Please try again later";

    public static unauthorized: string = "You're not authorized to access this page";


    //Regex
    public static nameRegex: string = "[a-zA-Z0_9 ]*";

    public static emailRegex: string = "[A-Za-z0-9._%]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

    public static error: string = "error";

}