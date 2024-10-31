header = document.getElementById('header')
logo = document.getElementById('logo')
moto = document.getElementById('moto')

window.addEventListener('scroll', () => { 
    if (window.scrollY == 0)
    {
        header.style.opacity = ""
        header.style.height = "";
        header.style.background = ""
        header.style.backdropFilter = "";
        logo.style.height = ""
        logo.style.left =""
        logo.style.backgroundSize = ""
        logo.style.width = "";
        moto.style.right = ""
        moto.style.top = ""
        moto.style.fontSize = ""
        moto.style.color = ""
    }
    else if (window.scrollY <= "80")
    {
        header.style.opacity = window.scrollY * 0.01;
    }
    else {
        header.style.opacity = 1;
        header.style.background = "#f1f1f1d1"
        header.style.backdropFilter = "blur(10px)";
        header.style.height = "60px";
        logo.style.width = "60px";
        logo.style.height ="60px"
        logo.style.left ="10px"
        logo.style.backgroundSize = "60px"
        moto.style.right = "10px"
        moto.style.fontSize = "15px"
        moto.style.top = "30px"
        moto.style.color = "black"
    }
});