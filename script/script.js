let lastname = document.getElementById("lastname");
let firstname = document.getElementById("firstname");
let btnAddMembers = document.getElementsByTagName("input")[0];
let GroupSize = document.getElementById("GroupSize");
let discRate = document.getElementById("discRate");
let members = document.getElementById("members");
let btnDelMembers = document.getElementsByTagName("input")[1];
let btnSortMembers = document.getElementsByTagName("input")[2];

function CheckForGroupMemberInput()
{
	if (lastname.value == "" || firstname.value == "")
	{
		throw "Please first enter a group member's name";
	}
}

function CheckForGroupSizeInput()
{
	if (GroupSize.value == "")
	{
		throw "Please first enter the group size";
	}
	else if (GroupSize.value == 0)
	{
		throw "Group size should be number greater than 0";
	}
	else if (isNaN(GroupSize.value))
	{
		throw "Please enter a number for the group size";
	}	
}

GroupSize.onchange = function(){CalcGroupDiscount()}

function CalcGroupDiscount()
{
	const BASICCHARGE = 50;
    let discountRate;
	
	if (GroupSize.value >= 5 && GroupSize.value <= 10)
	{
		discountRate = 0.1;
	}
	else if (GroupSize.value >= 11 && GroupSize.value <= 24)
	{
		discountRate = 0.2;
	}
	else if (GroupSize.value >= 25)
	{
		discountRate = 0.25;
	}
	else 
	{
		discountRate = 0;
	}
	let afterDiscount = BASICCHARGE - (BASICCHARGE*discountRate);
	discRate.value = afterDiscount.toFixed(2);
	
	try
	{
		CheckForGroupSizeInput();
	}
	catch (e)
	{
		alert(e);
		discRate.value = "";
	}
}

function AddGroupMember()
{
	try
	{
		CheckForGroupMemberInput();
	}
	catch(e)
	{
		alert(e);
	}
	let membersOption = document.createElement("option");
	membersOption.text = lastname.value + ", " + firstname.value;
	if (lastname.value != "" && firstname.value != "")
	{
		let i = 0;
		members.options.add(membersOption, i);
		i++;
	}
	lastname.value = "";
	firstname.value = "";
	lastname.focus();
}

btnAddMembers.onclick = function(){AddGroupMember()}

function RemoveGroupMember()
{
	if (members.selectedIndex < 0)
	{
		alert("There are no group members to delete!");
	}
	else
	{
		let i = members.selectedIndex;
		members.options.remove(i);
	}
}

btnDelMembers.onclick = function(){RemoveGroupMember()}

function SortGroupMembers()
{
	const tempMember = [];
	for (let i = 0; i < members.length; i++)
	{
		tempMember[i] = members.options[i].text;
		tempMember[i] = members.options[i].value;
	}
	tempMember.sort();
	for (let i = 0; i < members.length; i++)
	{
		members.options[i].text = tempMember[i];
		members.options[i].value = tempMember[i];
	}
}

btnSortMembers.onclick = function(){SortGroupMembers()}

let beeImage = document.getElementById("bee");
beeImage.style.left = "0px";
beeImage.style.top = "0px";

function FlyingBee()
{
	var left = beeImage.offsetLeft;
	var top = beeImage.offsetTop;
	beeImage.style.visibility = "visible";
	left += 6;
	top += 1.5;
	beeImage.style.left = left + "px";
	beeImage.style.top = top + "px";
	
	if (beeImage.offsetLeft >= window.innerWidth*0.6 || beeImage.offsetHeight >= window.innerHeight*0.35)
	{
		clearInterval(beeInterval);
		document.getElementById("advice").style.display = "block";
	}
}

let beeInterval = setInterval(FlyingBee, 20);
