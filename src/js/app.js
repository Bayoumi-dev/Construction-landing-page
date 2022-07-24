/**
 * Global Rules
 */
const header = document.body.querySelector('header'),
   menu = document.body.querySelector('#menu'),
   menuList = document.body.querySelectorAll('#menu li'),
   menuBtn = document.getElementById('menu-btn')

/**
 * Handle Open Menu
 */
let menuIsOpen = false
const openMenu = _ => {
   menu.classList.toggle('open')
   menu.classList.contains('open') ? (menuIsOpen = true) : (menuIsOpen = false)
   // handle click outside to close menu
   setTimeout(_ => {
      menuIsOpen && window.addEventListener('click', closeMenu)
   }, 0)
}
// Add event listener to burger menu button to open menu
menuBtn.addEventListener('click', openMenu)

// Close Menu
const closeMenu = e => {
   // Header and links menu exception
   e.target.parentElement.tagName !== 'HEADER' &&
      !e.target.parentElement.classList.contains('link') &&
      (menu.classList.remove('open'),
      // Remove event after closed the Menu
      window.removeEventListener('click', closeMenu))
}
