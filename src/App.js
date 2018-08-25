import React from 'react'
import './App.css'

class App extends React.Component{

  componentDidMount(){
    let hashA = this.init()
    let keys = hashA['keys']
    let hash = hashA['hash']
    this.generatedKeyboard(keys, hash)
    this.listenToUser(hash)
  }

  init(){
    let keys = [['q','w','e','r','t','y','u','i','o','p'],
                ['a','s','d','f','g','h','j','k','l'],
                ['z','x','c','v','b','n','m']]
    let hash = {'q': 'qq.com', 'w': 'weibo.com', 'e': '', 'r': 'rcfans.com', 't': '', 'y': 'youtube.com', 'u': '' , 'i': '', 'o': '', 'p': undefined, 'a': '', 's': '', 'z': 'zhihu.com', 'm': '', 'd': 'http://www.dnvod.tv/','x':'xiedaimala.com'}
    let hashInLocalStorage = this.getFromLocalStorage('zzz')
    if(hashInLocalStorage) {
      hash = hashInLocalStorage
    }
    return {
      "keys": keys,
      "hash": hash,
    }
  }
  
  getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || 'null')
  }
  
  tag(tagname){
    return document.createElement(tagname)
  }
  
  createSpan(textContent){
    let span = this.tag("span")
    span.innerText = textContent
    span.className = "text"
    return span
  }
  
  createButton(id, hash){
    let button = this.tag('button')
    button.textContent = "编辑"
    button.id = id
    button.onclick = function(e) {
      let button2 = e.target
      let img2 = button2.previousSibling
      let key = button2.id
      let x = prompt('给我一个网址')
      hash[key] = x
      img2.src = 'http://' + x + '/favicon.ico'
      img2.onerror = function(e) {
        e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
      }
      localStorage.setItem('zzz', JSON.stringify(hash))
    }
    return button
  }
  
  createImage(domain){
    let img = this.tag("img")
    if(domain){
      img.src = 'http://'+ domain + '/favicon.ico'
    } else {
      img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function(e) {
      e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
      return img
    }
    return img
  }
  
  generatedKeyboard(keys, hash){
    let main = document.getElementById('main')
    for(let i = 0; i < keys.length; i++) {
      let div = this.tag('div')
      div.className = 'row'
      main.appendChild(div)
      for(let j = 0; j < keys[i].length; j++) {
        let span = this.createSpan(keys[i][j])
        let button = this.createButton(keys[i][j], hash)
        let img = this.createImage(hash[keys[i][j]])
        console.log(img)
        let kbd = this.tag('kbd')
        kbd.className = "key"
        kbd.appendChild(span)
        kbd.appendChild(img)
        kbd.appendChild(button)
        div.appendChild(kbd)
      }
    } 
  }
  
  listenToUser(hash){
    document.onkeypress = function(clickedKey) {
      let key = clickedKey.key
      let website = hash[key]
      window.open('http://' + website, '_blank')
    }
  }

  render(){
    return (
      <section>
        <main>
          <div className="wrap" id="main"></div>
        </main>
      </section>
    )
  }
}

export default App
