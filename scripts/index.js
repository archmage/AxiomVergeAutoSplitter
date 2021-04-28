const websocket_endpoint = "ws://localhost:19906";

var splits = document.getElementById("splits");
var igt = document.getElementById("igt");
var pb = document.getElementById("pb");

window.onload = function () {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const category = urlParams.get('category');
	console.log(category);
	if (category != null) {
		document.getElementById("category").innerHTML = category;
	}
	const socket = new WebSocket(websocket_endpoint);
	socket.onmessage = (event) => appendData(JSON.parse(event.data));
};

function appendData(data) {
	if (data.AreaName == null) {
		return;
	}
	ClearAll();
	console.log(data);
	data.SplitsNames.map(split => {
		if (split.includes("Note")) {
			splits.innerHTML += `<div class="row"><img src="images/DigitalPaper.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split.includes("HealthNode")) {
			if (split.includes("Fragment")) {
				splits.innerHTML += `<div class="row"><img src="images/HealthNodeFragment.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
				return;
			}
			else {
				splits.innerHTML += `<div class="row"><img src="images/HealthNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
				return;
			}
		}
		if (split.includes("PowerNode")) {
			if (split.includes("Fragment")) {
				splits.innerHTML += `<div class="row"><img src="images/PowerNodeFragment.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
				return;
			}
			else {
				splits.innerHTML += `<div class="row"><img src="images/PowerNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
				return;
			}
		}
		if (split.includes("SizeNode")) {
			splits.innerHTML += `<div class="row"><img src="images/SizeNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split.includes("RangeNode")) {
			splits.innerHTML += `<div class="row"><img src="images/RangeNode.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "SecurityWorm") {
			splits.innerHTML += `<div class="row"><img src="images/Xedur.svg"/><div class="name">Xedur</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "SoldierBoss") {
			splits.innerHTML += `<div class="row"><img src="images/Telal.svg"/><div class="name">Telal</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "SlugBoss") {
			splits.innerHTML += `<div class="row"><img src="images/Uruku.svg"/><div class="name">Uruku</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "ScorpionBoss") {
			splits.innerHTML += `<div class="row"><img src="images/GirTab.svg"/><div class="name">Gir-Tab</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "MantaBoss") {
			splits.innerHTML += `<div class="row"><img src="images/Vision.svg"/><div class="name">Vision</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "DeformedTrace") {
			splits.innerHTML += `<div class="row"><img src="images/Clone.svg"/><div class="name">Clone</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "SpitBugBoss") {
			splits.innerHTML += `<div class="row"><img src="images/Ukhu.svg"/><div class="name">Ukhu</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "SecurityWormAdvanced")
		{
			splits.innerHTML += `<div class="row"><img src="images/Xedur.svg"/><div class="name">Xedur Hul</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
			return;
		}
		if (split == "End") {
			igt.innerHTML = IGTFormattedString(data.Splits["End"]);
			return;
		}
		splits.innerHTML += `<div class="row"><img src="images/${split}.svg"/><div class="name">${split}</div><div class="split">${IGTFormattedString(data.Splits[split])}</div></div>`;
	});
	pb.innerHTML = IGTFormattedString(data.PersonalBest);
	document.getElementById("splits").scrollTop = document.getElementById("splits").scrollHeight;
}

function IGTFormattedString(timestamp) {
	var totalMilliseconds = (timestamp * 1000) / 60;
	var milliseconds = totalMilliseconds % 1000;
	var totalSeconds = timestamp / 60;
	var seconds = totalSeconds % 60;
	var totalMinutes = totalSeconds / 60;
	var minutes = totalMinutes % 60;
	var totalHours = totalMinutes / 60;
	var hours = Math.floor(totalHours);
	return `${Math.floor(hours).toString().padStart(2, '0')}:${Math.floor(minutes).toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')}.${Math.floor(milliseconds).toString().padStart(3, '0')}`;
}

function ClearAll() {
	splits.innerHTML = "";
	igt.innerHTML = "00:00:00.000";
}
