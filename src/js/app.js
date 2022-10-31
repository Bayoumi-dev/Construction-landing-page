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

/**
 * Message from
 */
const messageFrom = document.forms['ms-from']
// Handle the message from
const handleMessageFrom = e => {
   e.preventDefault()

   const nameInput = e.target.name,
      emailInput = e.target.email,
      subjectInput = e.target.subject,
      messageInput = e.target.message

   const form = {
      name: nameInput.value,
      email: emailInput.value,
      subject: subjectInput.value,
      message: messageInput.value,
   }

   // Validate each input, then send the message and
   // reset the form
   !inputChecker(nameInput, checkValidName)
      ? inputChecker(nameInput, checkValidName)
      : !inputChecker(emailInput, checkValidEmail)
      ? inputChecker(emailInput, checkValidEmail)
      : !inputChecker(subjectInput, checkField)
      ? inputChecker(subjectInput, checkField)
      : !inputChecker(messageInput, checkField)
      ? inputChecker(messageInput, checkField)
      : (sendMessage(form),
        resetForm([nameInput, emailInput, subjectInput, messageInput]))
}
messageFrom.addEventListener('submit', handleMessageFrom)

const sendMessage = message => {
   // tell the user your message has been received
   document.getElementById('send').innerHTML = `
    <img src="assets/check-circle.svg" alt="" class="animate zoom-in start-animate">
    <span class="animate fade-in start-animate">Your message has been received.</span>
    `
   console.log(message)
}

/**
 * @description Reset Form
 * @param {HTMLElement[]} inputs
 * @returns Empty inputs
 */
const resetForm = inputs => inputs.forEach(input => (input.value = ''))

/**
 * @description Get the input label
 * @param {HTMLElement} Input
 * @returns {HTMLElement} The Label
 */
const label = input => input.parentElement
const labelTxt = label => label.querySelector('.label')

/**
 * @description Function to check the input
 * @param {HTMLElement} input
 * @param {function} checkValid
 * @returns {boolean}
 */
const inputChecker = (input, checkValid) => {
   if (typeof checkValid(input.value) === 'string') {
      input.focus()
      label(input).classList.add('error')
      // checkField has different parameter
      checkValid === checkField
         ? (labelTxt(label(input)).textContent = checkValid(
              input.value,
              input.name
           ))
         : (labelTxt(label(input)).textContent = checkValid(input.value))
      // Check input every change
      input.addEventListener('change', _ => inputChecker(input, checkValid))
      return false
   } else {
      label(input).classList.remove('error')
      labelTxt(label(input)).textContent = input.name
      return true
   }
}

/**
 * @description Check the field
 * @param {HTMLElement} input
 * @param {string} value
 * @returns {boolean | string} Is the field has value
 */
const checkField = (value, name) =>
   !value ? `${name} (Please fill out this field)` : true

/**
 * @description Name Validation
 * @param {string} Name
 * @returns {boolean | string} Is name validation
 */
const checkValidName = name =>
   !name
      ? 'Please enter your name'
      : !isValidName(name)
      ? 'Please provide a valid name'
      : true

// is the name valid
const isValidName = name => /[a-zA-Z]/.test(name)

/**
 * @description Email Validation
 * @param {string} Email
 * @returns {boolean | string} Boolean - Is email valid | String - Email is invalid
 */
const checkValidEmail = email =>
   !email
      ? 'Please enter your email'
      : !isValidEmail(email)
      ? 'Please provide a valid email address'
      : true

// is the email address valid
const isValidEmail = email =>
   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
   )

/**
 * Get in touch From
 */
const getInTouchForm = document.forms['get-in-touch'],
   Warning = getInTouchForm.querySelector('#Warning')
// Handle the form
const handleGetInTouchForm = e => {
   e.preventDefault()
   const emailInput = e.target.email
   emailInputChecker(emailInput) &&
      (sendEmail(emailInput.value), resetForm([emailInput]))
}
getInTouchForm.addEventListener('submit', handleGetInTouchForm)

/**
 * @description Send the email address to get in touch
 * tell the user your email has been received
 * @param {object} email - the email address
 */
const sendEmail = email => {
   getInTouchForm.querySelector('#done').removeAttribute('hidden')
   getInTouchForm.querySelector('#done span').textContent =
      'Your email has been received.'
   console.log(email)
}

/**
 * @description Function to check the email input
 * @param {HTMLElement} emailInput  - Email input
 * @returns {boolean} Is email valid
 */
const emailInputChecker = emailInput => {
   if (typeof checkValidEmail(emailInput.value) === 'string') {
      emailInput.focus()
      Warning.removeAttribute('hidden')
      getInTouchForm.querySelector('#done').setAttribute('hidden', '')
      setTimeout(_ => Warning.setAttribute('hidden', ''), 5000)
      Warning.querySelector('span').textContent = checkValidEmail(
         emailInput.value
      )
   } else {
      Warning.setAttribute('hidden', '')
      return true
   }
}

/**
 * Start the animation when the element is on the viewport
 */
const animations = document.body.querySelectorAll('.animate'),
   animateOptions = {
      threshold: 0.3,
   },
   animateOnScrolling = new IntersectionObserver(elements => {
      elements.forEach(element => {
         if (element.isIntersecting) {
            const elementStyle = getComputedStyle(element.target)
            let delay = elementStyle.animationDelay.replace('s', '') * 1000,
               duration =
                  elementStyle.animationDuration.replace('s', '') * 1000,
               animateTimeout = duration + 100
            // Wait for the delay
            if (delay) {
               element.target.style.animationDelay = '0s'
               setTimeout(_ => {
                  element.target.classList.add('start-animate')
                  startAnimate(element.target, animateTimeout)
               }, delay)
            } else {
               startAnimate(element.target, animateTimeout)
            }
            // Start the stats counter
            element.target.id === 'stats' && !iCount && startStatsCount()
         }
      })
   }, animateOptions)
// Execute the animateOnScrolling(observer)
animations.forEach(animate => {
   animateOnScrolling.observe(animate)
})

/**
 * @description Start the animations
 * @param {HTMLElement} element
 * @param {number} animateTimeout
 */
const startAnimate = (element, animateTimeout) => {
   element.classList.add('start-animate')
   setTimeout(_ => element.classList.remove('animate'), animateTimeout)
}

/**
 * Animated Counter for stats
 */
let iCount = 0
const startStatsCount = _ => {
   iCount = 1
   const statsNum = document.querySelectorAll('#stats [data-val]'),
      speed = 1000
   statsNum.forEach(statNum => {
      const target = +statNum.getAttribute('data-val')
      let inc = Math.ceil(target / speed)
      let count = Math.ceil(target * 0.98)
      const counter = setInterval(() => {
         count = count + inc > target ? target : count + inc
         statNum.textContent = count
         count === target && clearInterval(counter)
      }, 70)
   })
}
