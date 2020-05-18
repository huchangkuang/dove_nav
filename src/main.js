const $lastLi = $(".site").find(".add")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
// console.log(x)
// console.log(xObject)
const hashMap = xObject || [{
    logo: "../image/baidu_favicon.ico",
    description: "百度一下",
    url: "https://www.baidu.com"
    }, {
        logo: "../image/bilibili_favicon.ico",
        description: "哔哩哔哩",
        url: "https://www.bilibili.com"
    }]
const render = ()=>{
    $(".site").find("li:not(.add)").remove()
    hashMap.forEach(node=>{
        const $li = $(`<li>
        <a href="${node.url}">
            <div class="logo">
                <img src="${node.logo}" alt="${node.description}logo">
            </div>
            <div class="url">${node.description}</div>
        </a>
    </li>`).insertBefore($lastLi) 
    })
}
render()
$(".add").on("click", () => {
    let url = window.prompt("请输入你要添加的网址")
    if (url.indexOf("http") !== 0) {
        url = "https://" + url
    }
    console.log(url)
    let imgSrc = url + "/favicon.ico"
    hashMap.push({
        logo: imgSrc,
        description: url,
        url: url
    })
    render()
})
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem("x",string)
}