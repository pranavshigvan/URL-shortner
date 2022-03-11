const nav = document.getElementById("nav")
const hamButton = document.getElementById("ham_button")
const backDrop = document.getElementById("backdrop")
const form = document.getElementById("url_form")
const input = document.getElementById("url")
const shortenLinks = document.getElementById("shorten_links")

hamButton.onclick = (e)=>{
    nav.style.display = "flex";
    backDrop.style.display = "block"
}

backDrop.onclick = (e)=>{
    nav.style.display = "none";
    e.target.style.display = "none"
}

window.onresize = (e)=>{
    if(window.innerWidth > 650) {
        nav.style.display = "flex";
        backDrop.style.display = "none"
    }
    if(window.innerWidth <= 650) {
        nav.style.display = "none";
        backDrop.style.display = "none"
    }
}



form.onsubmit = (e)=>{
    e.preventDefault()
    console.log(input.value)
    fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`)
    .then((res => res.json()))
    .then( data => {
        shortenLinks.innerHTML = ""
        const urlGenerator = (shortLink)=>{
            console.log("a")
            const shortUrl = document.createElement("div")
            const copyBtn = document.createElement("button")
            copyBtn.innerText = "Copy"
            const span = document.createElement("span")
            span.innerText = shortLink
            shortUrl.classList.add("short_url")
            shortUrl.appendChild(span)
            shortUrl.appendChild(copyBtn)
            copyBtn.onclick = (e)=>{
                navigator.clipboard.writeText(data.result.short_link)
                e.target.innerText = "coppied"
                copyBtn.classList.add("coppied")
            }
            return shortUrl
        }
        shortenLinks.appendChild(urlGenerator(data.result.short_link))
        shortenLinks.appendChild(urlGenerator(data.result.short_link2))
        shortenLinks.appendChild(urlGenerator(data.result.short_link3))
    })

    input.value = ""
}
