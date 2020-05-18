const $lastLi = $(".site").find(".add")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
let fInput = $(".first-input")
let sInput = $(".second-input")
let finish = $(".button :last-child")
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
const render = () => {
    $(".site").find("li:not(.add)").remove()
    hashMap.forEach(node => {
        const $li = $(`<li>
            <div class="logo">
                <img src="${node.logo}" alt="${node.description}logo">
            </div>
            <div class="url">${node.description}</div>
            <div class="close">
               ···
            </div>
    </li>`).insertBefore($lastLi)
        $li.on("click", () => {
            window.open(node.url, "_self")
        })
        $li.on("click", ".close", () => {
            e.stopPropagation() //阻止冒泡
        })
    })
}
render()
$(".add").on("click", () => {
    $(".container").addClass("show")
})
//实时监听输入框事件
$(".url-input").on("input properchange", () => {
    let isClick = false
    if ((fInput.val() && sInput.val()) !== "") {
        finish.addClass("blue")
        isClick = true
    } else {
        finish.removeClass("blue")
        isClick = false
    }
    //动态事件
    if (isClick === true) {
        finish.on("click", () => {
            let url = sInput.val()
            if (url.indexOf("http") !== 0) {
                url = "https://" + url
            }
            console.log(url)
            let description = fInput.val()
            console.log(description)
            let imgSrc = url + "/favicon.ico"
            hashMap.push({
                logo: imgSrc,
                description: description,
                url: url
            })
            render()
            $(".container.show").removeClass("show")
        })
    } else {
        finish.unbind("click")
    }
})
if (fInput.val() && sInput.val() !== "") {
    finish.addClass("blue")
}
$(".button :nth-child(2)").on("click", () => {
    $(".container.show").removeClass("show")
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem("x", string)
}