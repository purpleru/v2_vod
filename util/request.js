const BASEURL = 'http://ys.wgudu.com';

async function request(options = {}) {
    let URL = options.path ? BASEURL + options.path : options.url;

    return uni.request(Object.assign(options, { url: URL }));
}

export default request;
