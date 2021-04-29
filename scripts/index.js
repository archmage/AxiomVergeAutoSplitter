const websocket_endpoint = "ws://localhost:19906"

var splits = document.getElementById("splits")
var igt = document.getElementById("igt")
var pb = document.getElementById("pb")

// I've made these dictionaries so that each can be used for text replacements.
// This helps to reduce data redundancy. -Arch

const ProgressionItems = {
	AddressDisruptor1: "Address Disruptor 1",
	AddressDisruptor2: "Address Disruptor 2",
	BlackCoat: "Trenchcoat",
	Drill: "Laser Drill",
	DroneGun: "Remote Drone",
	DroneTeleport: "Drone Teleport",
	GlitchBomb: "Address Bomb",
	GlitchTeleport: "Modified Lab Coat",
	Grapple: "Grapple",
	HighJump: "Field Disruptor",
	RedCoat: "Red Coat"
}

const Weapons = {
	DataDisruptor: "Axiom Disruptor",
	DataGrenade: "Data Bomb",
	DistortionField: "Distortion Field",
	FatBeam: "Fat Beam",
	FireWall: "Firewall",
	FlameThrower: "Flamethrower",
	HeatSeeker: "Heat Seeker",
	InertialPulse: "Inertial Pulse",
	IonBeam: "Ion Beam",
	Kilver: "Kilver",
	LightningGun: "Lightning Gun",
	MultiDisruptor: "Multi-Disruptor",
	Nova: "Nova",
	Reflect: "Reflector",
	Scythe: "Reverse Slicer",
	Shards: "Shards",
	Swim: "Quantum Variegator",
	TetheredCharge: "Tethered Charge",
	TriCone: "Turbine Pulse",
	VerticalSpread: "Hypo-Atomizer",
	Voranj: "Voranj",
	WallTrace: "Orbital Discharge",
	WebSlicer: "Scissor Beam",
}

const OtherItems = {
	BreachSuppressor: "Sudran Key",
	EnhancedLaunch: "Enhanced Drone Launch",
	PasswordTool: "Passcode Tool",
	TendrilsBottom: "Bioflux Accelerator",
	TendrilsTop: "Bioflux Accelerator",
}

const Events = {
	FirstDeath: "First Death",
	RepairDronesEnabled: "Repair Drones Enabled"
}

const Bosses = {
	SecurityWorm: "Xedur",
	SoldierBoss: "Telal",
	SlugBoss: "Uruku",
	ScorpionBoss: "Gir-Tab",
	MantaBoss: "Vision",
	DeformedTrace: "Clone",
	SpitBugBoss: "Ukhu",
	SecurityWormAdvanced: "Xedur Hul",
	End: "Athetos"
}

// if a split name matches a node key, replace the WHOLE text with the value
// this can have fragments added if needed
const NodeTypes = {
	"HealthNode": "Health Node",
	"PowerNode": "Power Node",
	"SizeNode": "Size Node",
	"RangeNode": "Range Node"
}

const Difficulty = ["Normal", "Hard"]
const Progression = ["Default", "Advanced", "Masochist"]

window.onload = function () {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const category = urlParams.get('category')
	console.log(category);
	if (category != null) {
		document.getElementById("category").innerHTML = category
	}
	const socket = new WebSocket(websocket_endpoint)
	socket.onmessage = (event) => appendData(JSON.parse(event.data))
}

function SetTitle(data) {
	if (data.IsRandomizer) {
		document.getElementsByClassName("title")[0].innerHTML = "Axiom Verge Randomizer";
		document.getElementById("category").innerHTML = `Progression: ${Progression[data.Progression]}`;
		return;
	}
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const category = urlParams.get('category');
	document.getElementsByClassName("title")[0].innerHTML = "Axiom Verge";
	if (category == null) {
		document.getElementById("category").innerHTML = `${Difficulty[data.Difficulty]} Any%`;
		return;
	}
	document.getElementById("category").innerHTML = `${Difficulty[data.Difficulty]} ${category}`;
	
}

function checkIfNode(split) {
	for(var nodeType in NodeTypes) {
		if(split.includes(nodeType) && !split.includes("Fragment")) return nodeType
	}
	return null
}

// catchall function for all other split names
function replaceName(name) {
	if(name in Weapons) return Weapons[name]
	if(name in OtherItems) return OtherItems[name]
	if(name in Events) return Events[name]

	return name
}

function appendData(data) {
	if (data.AreaName == null) {
		return;
	}
	ClearAll();
	console.log(data);
	SetTitle(data);
	data.SplitsNames.map(split => {
		if (split in Bosses) {
			splits.innerHTML += `<div class="row boss"><img src="images/${Bosses[split].replace('[ -]', '')}.svg"/><div class="name">${Bosses[split]}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			if (split == "End") {
				igt.innerHTML = IGTFormattedString(data.Splits[split]);
			}
			return;
		}
		if (split in ProgressionItems)
		{
			splits.innerHTML += `<div class="row progression"><img src="images/${split}.svg"/><div class="name">✩ ${ProgressionItems[split]}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;

			// go-mode check
			if(false) {
				splits.innerHTML += `<div class="gomode"><div class="name">GO MODE</div><div class="line"></div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
			}

			return;
		}
		if (split.includes("Note")) {
			// splits.innerHTML += `<div class="row"><img src="images/DigitalPaper.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
			return;
		}
		if(split.includes("Fragment")) {
			return;
		}
		
		// condensed handling of all node types
		// fragment handling has been removed for now, and can be readded if needed
		var nodeType = checkIfNode(split);
		if(nodeType != null) {
			splits.innerHTML += `<div class="row"><img src="images/${nodeType}.svg"/><div class="name">${NodeTypes[nodeType]}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}

		splits.innerHTML += `<div class="row"><img src="images/${split}.svg"/><div class="name">${replaceName(split)}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
	});

	pb.innerHTML = IGTFormattedString(data.PersonalBest);
	document.getElementById("splits").scrollTop = document.getElementById("splits").scrollHeight;
}

function IGTFormattedString(timestamp) {
	var totalMilliseconds = (timestamp * 1000) / 60
	var milliseconds = totalMilliseconds % 1000
	var totalSeconds = timestamp / 60
	var seconds = totalSeconds % 60
	var totalMinutes = totalSeconds / 60
	var minutes = totalMinutes % 60
	var totalHours = totalMinutes / 60
	var hours = Math.floor(totalHours)

	var hoursFormatted = hours < 1 ? "" : `${Math.floor(hours).toString()}:`
	var minutesFormatted = Math.floor(minutes).toString()
	if (hours > 0) minutesFormatted = minutesFormatted.padStart(2, '0')

	return `${hoursFormatted}${minutesFormatted}:${Math.floor(seconds).toString().padStart(2, '0')}.${Math.floor(milliseconds).toString().padStart(3, '0')}`

	// old
	// return `${Math.floor(hours).toString().padStart(2, '0')}:${Math.floor(minutes).toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')}.${Math.floor(milliseconds).toString().padStart(3, '0')}`
}

function ClearAll() {
	splits.innerHTML = ""
	igt.innerHTML = "00:00:00.000";
}