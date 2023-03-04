function errorHandler(Error: any, req: any, res: any, next: any) {
    res.status(Error.status || 500);
    console.log(Error);
}

export default errorHandler;