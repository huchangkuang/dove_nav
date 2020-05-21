const $lastLi = $(".site").find(".add")
const x = localStorage.getItem("x")
const xObject = JSON.parse(x)
let fInput1 = $(".container .first-input")
let sInput1 = $(".container .second-input")
let finish1 = $(".container .modify.last")
let fInput2 = $(".container-change .first-input")
let sInput2 = $(".container-change .second-input")
let finish2 = $(".container-change .modify.last")
var i = 0
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
    hashMap.forEach((node, index) => {
        const $li = $(`<li title="${node.description}">
            <div class="logo">
                <img src="${node.logo}" alt="${node.description}logo">
            </div>
            <div class="url">${node.description}</div>
            <div class="write" title="修改">
                <svg class="icon-xiugai">
                    <use xlink:href="#icon-xiugai"></use>
                </svg>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on("click", () => {
            window.open(node.url, "_self")
        })
        //修改快捷导航
        $li.on("click", ".write", (e) => {
            e.stopPropagation() //阻止冒泡
            $(".container-change").addClass("show")
            //修改全局变量
            window.i = index
        })
    })
}
console.log(`全局${i}`)
render()
function del() {
    hashMap.splice(i, 1)
    render()
    $(".container-change").removeClass("show")
}
function clear(fInput, sInput, finish) {
    fInput.val("")
    sInput.val("")
    finish.removeClass("blue")
}
function cancel(fInput, sInput, finish) {
    $(".show").removeClass("show")
    clear(fInput, sInput, finish)
}
function add_show() {
    $(".container").addClass("show")
}
function done(fInput, sInput, finish, add) {
    if (!finish.hasClass("blue")) {
        return
    }
    if (add === "add") {
        let url = sInput.val()
        if (url.indexOf("http") !== 0) {
            url = "https://" + url
        }
        let description = fInput.val()
        let imgSrc = url + "/favicon.ico"
        hashMap.push({
            logo: imgSrc,
            description: description,
            url: url
        })
        render()
        clear(fInput, sInput, finish)
        $(".container.show").removeClass("show")
    } else if (add === "modify") {
        let url = sInput.val()
        if (url.indexOf("http") !== 0) {
            url = "https://" + url
        }
        let description = fInput.val()
        let imgSrc = url + "/favicon.ico"
        hashMap[i] = {
            logo: imgSrc,
            description: description,
            url: url
        }
        console.log(i)
        render()
        clear(fInput, sInput, finish)
        $(".container-change").removeClass("show")
    }
}
function add_blue(sInput, finish) {
    if (sInput.val() !== "") {
        finish.addClass("blue")
    } else if (finish.hasClass("blue")) {
        finish.removeClass("blue")
    }
}
//页面关闭前保存哈希值
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem("x", string)
}