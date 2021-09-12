//Ideas from https://heykendra.com/100/
const challengeList=["Talk to someone new",
"Take yourself to lunch","Have a difficult conversation face to face instead of email/text/phone",
"Ask for a raise","Call your parents just to tell them how much you love them",
"Go to a restaurant, order and eat dessert first",
"Ask for constructive criticism at work/school",
"Stand up for yourself","Do something that intimidates you",
"Unplug from email, social media and your phone for 8 hrs",
"Try an online class"]

function challengePicker(){
  num=Math.floor(Math.random() * challengeList.length);
  return challengeList[num]
}
document.getElementById("challenge").innerHTML = challengePicker();