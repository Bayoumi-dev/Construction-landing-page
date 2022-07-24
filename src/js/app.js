/**
 * Global Rules
 */
const header = document.body.querySelector('header'),
   menu = document.body.querySelector('#menu'),
   menuList = document.body.querySelectorAll('#menu li'),
   menuBtn = document.getElementById('menu-btn'),
   engCards = document.body.querySelectorAll('#eng-card-container > li'),
   engcardLists = document.body.querySelectorAll('[data-dropdown]'),
   engDropdownBtns = document.body.querySelectorAll(
      '[aria-label="dropdown list"]'
   )

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

/**
 * Handle The Engineer Cards Dropdown
 */
let listIsOpen = false
const engDropdown = e => {
   const card = e.target.parentElement.parentElement
   const list = card.querySelector('[data-dropdown]')
   /**
    * @description Function to check the dropdown list is open to close it
    * @param {HTMLElement} card
    */
   const checkListIsOpenToClose = card => {
      engcardLists.forEach(engcardList => {
         const currEngcard = engcardList.parentElement.parentElement
         if (card)
            card.id !== currEngcard.id &&
               !engcardList.hasAttribute('hidden') &&
               engcardList.setAttribute('hidden', '')
         else
            !engcardList.hasAttribute('hidden') &&
               engcardList.setAttribute('hidden', '')
      })
   }

   checkListIsOpenToClose(card)
   list.toggleAttribute('hidden')

   !list.hasAttribute('hidden') ? (listIsOpen = true) : (listIsOpen = false)

   const closeEngDropdown = e => {
      !e.target.hasAttribute('aria-label', 'dropdown list') &&
         checkListIsOpenToClose()
      // Remove event after closed the dropDown list
      window.removeEventListener('click', closeEngDropdown)
   }
   // handle click outside to close the dropDown list
   setTimeout(_ => {
      listIsOpen && window.addEventListener('click', closeEngDropdown)
   }, 0)
}

// Add event listener to each engineer card dropdown button
engDropdownBtns.forEach(engDropdownBtn =>
   engDropdownBtn.addEventListener('click', engDropdown)
)

/**
 * Engineer Cards Slider
 */
const slider = document.body.querySelector('#eng-card-container'),
   slide = engCards,
   prev = document.body.querySelector('#prev'),
   next = document.body.querySelector('#next')

/**
 * @description Function to scroll the slider right(next)
 * and left(previous)
 * @param {string} move
 */
const moveSlide = move => {
   const sliderWidth = slider.offsetWidth
   const sliderScrollWidth = slider.scrollWidth
   const slideWidth = slide[0].clientWidth

   const scrollPer = slider.scrollWidth / slide.length
   const scrollPosition = slider.scrollLeft
   const scrollRemainingNext =
      sliderScrollWidth - sliderWidth - scrollPosition - scrollPer
   const scrollRemainingPrev = scrollPosition - slideWidth

   switch (move) {
      case 'next':
         slider.scroll({
            left:
               slideWidth > scrollRemainingNext
                  ? sliderScrollWidth
                  : scrollPosition + scrollPer,
            behavior: 'smooth',
         })

         !prev.classList.contains('clickable') &&
            prev.classList.add('clickable')
         slideWidth > scrollRemainingNext && next.classList.remove('clickable')
         break

      case 'prev':
         slider.scroll({
            left:
               slideWidth > scrollRemainingPrev
                  ? 0
                  : scrollPosition - scrollPer,
            behavior: 'smooth',
         })

         !next.classList.contains('clickable') &&
            next.classList.add('clickable')
         slideWidth > scrollRemainingPrev && prev.classList.remove('clickable')
   }

   // Reset the slider when resizing the window
   window.addEventListener('resize', _ => {
      slider.scroll({
         left: 0,
         behavior: 'smooth',
      })
      prev.classList.remove('clickable')
      next.classList.add('clickable')
   })
}
next.addEventListener('click', _ => moveSlide('next'))
prev.addEventListener('click', _ => moveSlide('prev'))
