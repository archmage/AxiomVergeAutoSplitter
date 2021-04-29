const websocket_endpoint = "ws://localhost:19906"

var splits = document.getElementById("splits")
var igt = document.getElementById("igt")
var pb = document.getElementById("pb")

const ProgressionItems = [
	"AddressDisruptor1",
	"AddressDisruptor2",
	"BlackCoat",
	"BreachSuppressor",
	"Drill",
	"DroneGun",
	"DroneTeleport",
	"EnhancedLaunch",
	"GlitchBomb",
	"GlitchTeleport",
	"Grapple",
	"HighJump",
	"PasswordTool",
	"RedCoat"
];

const Bosses = {
	Xedur: "Xedur",
	Telal: "Telal",
	Uruku: "Uruku",
	GirTab: "Gir-Tab",
	Vision: "Vision",
	Clone: "Clone",
	Ukhu: "Ukhu",
	XedurHul: "Xedur Hul",
	End: "Athetos",
}

const NameDictionary = {
	FirstDeath: "First Death",
	AddressDisruptor1: "Address Disruptor",
	AddressDisruptor2: "Address Disruptor 2",
	BlackCoat: "Trenchcoat",
	BreachSuppressor: "Sudran Key",
	DataDisruptor: "Axiom Disruptor",
	DataGrenade: "Data Bomb",
	DistortionField: "Distortion Field",
	Drill: "Drill",
	DroneGun: "Remote Drone",
	DroneTeleport: "Drone Teleport",
	EnhancedLaunch: "Enhanced Drone Launch",
	FatBeam: "Fat Beam",
	FireWall: "Fire Wall",
	FlameThrower: "Flamethrower",
	GlitchBomb: "Address Bomb",
	GlitchTeleport: "Modified Lab Coat",
	Grapple: "Grapple",
	HeatSeeker: "Heat Seeker",
	HighJump: "Field Disruptor",
	InertialPulse: "Inertial Pulse",
	IonBeam: "Ion Beam",
	Kilver: "Kilver",
	LightningGun: "Lightning Gun",
	MultiDisruptor: "Multi Disruptor",
	Nova: "Nova",
	PasswordTool: "Password Tool",
	RedCoat: "Red Coat",
	Reflect: "Reflector",
	Scythe: "Reverse Slicer",
	Shards: "Shards",
	Swim: "Quantum Variegator",
	TendrilsBottom: "Bioflux Accelerator Bottom",
	TendrilsTop: "Bioflux Accelerator Top",
	TetheredCharge: "Tethered Charge",
	TriCone: "Turbine Pulse",
	VerticalSpread: "Hypo-Atomizer",
	Voranj: "Voranj",
	WallTrace: "Orbital Discharge",
	WebSlicer: "Scissor Beam",
}

const Difficulty = [
	"Normal",
	"Hard"
];

const Progression = [
	"Default",
	"Advanced",
	"Masochist"
];

window.onload = function () {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const category = urlParams.get('category')
	console.log(title, category);
	if (category != null) {
		document.getElementById("category").innerHTML = category
	}
	const socket = new WebSocket(websocket_endpoint)
	socket.onmessage = (event) => appendData(JSON.parse(event.data))
}

function SetTitle(data) {
	if (data.IsRandomizer) {
		document.getElementsByClassName("title")[0].innerHTML = "Axiom Verge Randomizer";
		document.getElementById("category").innerHTML = `${Difficulty[data.Difficulty]} ${Progression[data.Progression]} ${data.Seed}`;
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

function appendData(data) {
	if (data.AreaName == null) {
		return
	}
	ClearAll()
	console.log(data)
	SetTitle(data);
	data.SplitsNames.map(split => {
		if (split in Bosses) {
			splits.innerHTML += `<div class="row"><img src="images/${split}.svg"/><div class="name boss">${Bosses[split]}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			if (split == "End") {
				igt.innerHTML = IGTFormattedString(data.Splits[split]);
			}
			return;
		}
		if (split in ProgressionItems)
		{
			splits.innerHTML += `<div class="row"><img src="images/${split}.svg"/><div class="name progression">✩ ${ProgressionItems[split]}</div><div class="split progression">${IGTFormattedString(data.Splits[split])}</div></div>`
			return
		}
		if (split.includes("Note")) {
			// splits.innerHTML += `<div class="row"><img src="images/DigitalPaper.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
			return
		}
		if (split.includes("HealthNode")) {
			if (split.includes("Fragment")) {
				// splits.innerHTML += `<div class="row"><img src="images/HealthNodeFragment.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
				return
			}
			else {
				splits.innerHTML += `<div class="row"><img src="images/HealthNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
				return
			}
		}
		if (split.includes("PowerNode")) {
			if (split.includes("Fragment")) {
				// splits.innerHTML += `<div class="row"><img src="images/PowerNodeFragment.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
				return
			}
			else {
				splits.innerHTML += `<div class="row"><img src="images/PowerNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
				return
			}
		}
		if (split.includes("SizeNode")) {
			splits.innerHTML += `<div class="row"><img src="images/SizeNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
			return
		}
		if (split.includes("RangeNode")) {
			splits.innerHTML += `<div class="row"><img src="images/RangeNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`
			return
		}
		splits.innerHTML += `<div class="row"><img src="images/${split}.svg"/><div class="name">${NameDictionary[split]}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
	});
	pb.innerHTML = IGTFormattedString(data.PersonalBest);
	document.getElementById("splits").scrollTop = document.getElementById("splits").scrollHeight;
}

// list of item strings
var progressionItems = {
	Drill: "Laser Drill",
	AddressDisruptor1: "Address Disruptor 1",
	HighJump: "Field Disruptor",
	GlitchTeleport: "Modified Lab Coat",
	DroneGun: "Remote Drone",
	AddressDisruptor2: "Address Disruptor 2",
	Grapple: "Grapple",
	BlackCoat: "Trenchcoat",
	GlitchBomb: "Address Bomb",
	DroneTeleport: "Drone Teleport",
	RedCoat: "Red Coat"
}

// partially implemented, sorry!
var replacedNames = {
	// weapons
	VerticalSpread: "Hypo-Atomizer",
	FireWall: "Firewall",
	DataGrenade: "Data Bomb",
	WallTrace: "Orbital Discharge",
	Swim: "Quantum Variegator",
	InertialPulse: "Inertial Pulse",
	DistortionField: "Distortion Field",
	LightningGun: "Lightning Gun",
	TetheredCharge: "Tethered Charge",
	WebSlicer: "Scissor Beam",
	HeatSeeker: "Heat Seeker",

	// other items
	EnhancedLaunch: "Enhanced Drone Launch",
	BreachSuppressor: "Sudran Key",
	TendrilsTop: "Bioflux Accelerator",
	TendrilsBottom: "Bioflux Accelerator",

	// events
	RepairDronesEnabled: "Repair Drones Enabled"
}

var bossNames = {
	SecurityWorm: "Xedur",
	SoldierBoss: "Telal",
	SlugBoss: "Uruku",
	ScorpionBoss: "GirTab",
	MantaBoss: "Vision",
	DeformedTrace: "Clone",
	SpitBugBoss: "Ukhu",
	SecurityWormAdvanced: "Xedur Hul",
	End: "Athetos"
}

function replaceNames(name) {
	if(name in progressionItems) return progressionItems[name]
	if(name in replacedNames) return replacedNames[name]
	return name
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
	igt.innerHTML = "00:00:00.000"
}
