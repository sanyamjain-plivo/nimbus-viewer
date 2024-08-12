import '../scss/styles.scss';
import 'bootstrap'

const editBox = document.getElementById('editBox');
const resultBox = document.getElementById('editBox2');
const processButton = document.getElementById('processButton')
const spinner = document.getElementById('spinner')
const collapseOne = document.getElementById('collapseOne')
const collapseTwo = document.getElementById('collapseTwo')

if (processButton && spinner &&collapseOne) {
  processButton.addEventListener('click' , () => {
    console.log('start processing of nimbus logs')
    processButton.style.display = 'none'
    spinner.style.display = 'block'
    if (processNimbusLogs()) {
      $('#collapseOne').collapse('hide')
      $('#collapseTwo').collapse('show')
      processButton.style.display = 'block'
      spinner.style.display = 'none'
    }
    
  })
}
if (editBox) {
  editBox.classList.add('customplaceholder');
  editBox.setAttribute('data-placeholder', 'Paste you nimbus logs here')

  editBox.addEventListener('input', () => {
    if (editBox.innerText.trim().length === 0) {
      editBox.classList.add('customplaceholder')
    } else {
      editBox.classList.remove('customplaceholder')
    }
  });

  editBox.addEventListener('focus', () => {
    if (editBox.innerText.trim().length === 0) {
      editBox.classList.remove('customplaceholder');
    }
  });

  editBox.addEventListener('blur', () => {
    if (editBox.innerText.trim().length === 0) {
      editBox.classList.add('customplaceholder')
    }
  })
}


const processNimbusLogs = () => {
  const regex = /^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{1,3}\].*/;
  if (editBox && resultBox) {
    if(editBox.innerText.trim().length > 0 ) {
      const logString = editBox.innerText;
      const logPairs = logString.split(/\[202/)
      const formattedLogs = logPairs.map((part, index) => {
        if (part.length > 0 ) {
          if (index === logPairs.length - 1) {
            const lastSplit = part.split(' ]","sdkName"')
            if (lastSplit && lastSplit.length > 1) {
              return '[202' + lastSplit[0]
            }
          }
          return '[202' + part;
        }
      }).filter((log, index) => {
        if (log && regex.test(log)) {
          return log
        }
      }).join('\n')
      resultBox.innerText = formattedLogs
    }
    return true
  }
  return false
}