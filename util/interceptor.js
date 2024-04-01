const BASEURL = 'http://ys.wgudu.com';

uni.addInterceptor('request', {
    invoke(args) {
        args.url = BASEURL + args.url;
    }
});
