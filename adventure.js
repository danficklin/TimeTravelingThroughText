const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
state = {}
showTextNode(1)
}

function showTextNode(textNodeIndex) {
const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
textElement.innerText = textNode.text
while (optionButtonsElement.firstChild) {
optionButtonsElement.removeChild(optionButtonsElement.firstChild)
}

textNode.options.forEach(option => {
if (showOption(option)) {
    const button = document.createElement('button')
    button.innerText = option.text
    button.classList.add('btn')
    button.addEventListener('click', () => selectOption(option))
    optionButtonsElement.appendChild(button)
}
})
}

function showOption(option) {
return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
const nextTextNodeId = option.nextText
if (nextTextNodeId <= 0) {
return startGame()
}
state = Object.assign(state, option.setState)
showTextNode(nextTextNodeId)
}

const textNodes = [
{
id: 1,
text: 'You arrive at the mansion of your eccentric but brilliant granfather, a noted adventurer and inventor. You come to the door, only to realize that the house has been broken into. You see a crowbar lying on the ground along with shards of broken green glass.',
options: [
    {
    text: 'Gather the shards of glass.',
    setState: { glassShards: true },
    setState: { injured: true }
    nextText: 2
    },
    {
    text: 'Pick up the crowbar',
    setState: {crowbar: true}
    nextText: 3
    }
    {
        text: 'Enter the house.',
        nextText: 4
    }
]
},
{
id: 2,
text: 'You cut your hands on the glass, but manage to gather some of the shards and wrap them in your shirt. You are still standing outside the mansion.',
options: [
    {
    text: 'Pick up the crowbar.',
    requiredState: (currentState) => currentState.crowbar,
    setState: { crowbar: true },
    nextText: 4
    },
    {
    text: 'Enter the house.',
    nextText: 3
    }
]
},
{
    id: 3,
    text: 'text',
    options: [
        {
        text: 'option',
        nextText: 4
        },
        {
        text: 'option2',
        nextText: 5
        }
    ]
    },
]

startGame()