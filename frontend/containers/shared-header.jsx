import React, { Component } from 'react';
import { connect } from 'react-redux';
import './shared-header.scss';

class SharedHeader extends Component {
	constructor() {
		super();

	}

	render() {
		const fullName = `${ this.props.firstName } ${ this.props.lastName }` || '';
		const globalRole = this.props.globalRole || '';
		/*getHeader();*/
		return (
			<header id='header'>
				<div className='hdr-header'>
					<img className='hdr-logo' id='BSheaderLogo' src="http://academy.binary-studio.com/resources/logo.png"/>
					<div>
						<div className='hdr-buttons'>
							<input id='searchBar' placeholder="Search"/>
							{/*<button id='searchBtn' className='searchBtn'>Filter</button>*/}
							<a id='userLink' className='hdr-noTextDecoration'>
								<div id='userProfile'>
									<img  id='avatar' src="http://www.appresume.com/cv_templates/cv_2_1/conf/images/profile.jpg" alt="" />
									<span id='userName'>{ fullName }</span>
									<span id='profileBarArrDwn'></span>
								</div>
							</a>
				{/*			- a(href="http://team.binary-studio.com/auth/logout")
							- 	div#logOutBtn
							- 		img#logOutImg(src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAB+0lEQVRoQ+2ajU3DMBCFkw26AWECugEdoUxA2KCdgDIBMAHpBnQDmICOEDZgg/Ce5KDIOPFVtiM7sqWoVeOf+3zPd47TslhIKRfCUWSQ2Dwp9kjXdRsYf4+rmgmixTjHsiw/JOOJQACxQ2fPkg4D1NkD5sXWrxUEEGt08mXrKPD9a8DQQ6NFAnJA68fAhtq6fwII7XACoUZvBz0c8b2xjex4v0Z7rse+nACy9Q1inR1HiAJy1lXwCZBNBuEMYHZ0aWWPSCWXpTU1U1laUh0Z6qkkzBB/o26nGbVUkFnhk1sT5pM0QNRerkGu+NEdhHtMjtskEqJah1cw+A4Gnw0wKxPksJ5krxU8j2gBZQejXy9dYjGCkOEd14PNC7F7pLevHZOayVuxemRoq0hqQUGg/e5SrY/Ut0otFRDyTUotJZBvlU/+hWdSpgJygq31VBQLCiJdH4aN6bCpt1OUuRNiDzEpJX2SYvWIVUopgIikFDNINRaVsIaS2TTySDb9bbwputEL+J3nzTWuNB6sdBD1qPuG33nuzJIsyAHGD8+bM8ift/NxkHR/YqiXTxqnJm/J0mqYvByUI2nK3MGrL15e9OihUGKI7zrWVxmS3e8yXoZyahfxerrXiPrDAHVb+dbNSH8t16LXPwzMZLjTMNY14tT7jI0zyIyTLRrqF74MkEI5G3CLAAAAAElFTkSuQmCC")
				*/}			<button id='appsBtn' className='hdr-button'>
								<img className='hdr-appsLogo' src="http://team.binary-studio.com/app/images/Thumbnails.png"/>
							</button>
							<button id='notificationBtn' className='hdr-button'>
								<img className='hdr-appsLogo' src="http://team.binary-studio.com/app/images/bell.png"/>
							</button>
						</div>
						<div id='notificationCounter' className='hdr-invisible'></div>
						<div id='search'></div>
					</div>

					<div id='logOutBox' className='hdr-invisible hdr-headerElements'>
						<div id='userprofileBtnInBox' className='hdr-logOutButtons'>
							<button id='userProfileInBoxBtn' className='hdr-userprofileAndLogoutBtn hdr-button'>
								<img className='hdr-userprofileAndLogoutImg' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABFUlEQVRIS82V3RHBQBSFv3SgA1RACVSACtABFaACJdABHdABKkAHSjAnk+QhdrM3MXbcl8yE3e+e+3OSECGSCAzqQAbAFOhkiZ2BjSVJK2QBbB0XPjLQvgpmgSjzeyDjLiCgMyyQGbALQFS29TcQHV79GhJFiabqFFAyBDRtjXvSBy7/0Pg54B1jy3S1slL0PGpugEr6+qZcOlvV/EoVOmxRkieoZWuXsn0C6plXRV2Ia18qlzBPqI6SKJAjMCqVS+8mISe2KJFByoHHnssEWjY1SI2lPEtPS+Tfl4/NdynRXhxqXF5OQBCVsJg4F+QK+BbPokj/EUh+lkYZYjFDK6gwTRfE2oMQTGrS/limK3RZ8PcokDcWljAaGF/vbwAAAABJRU5ErkJggg=="/>
								<span>Profile</span>
							</button>
						</div>

						<div id='logOutBtnInBox' className='hdr-logOutButtons'>
							<button id='logOutButton' className='hdr-userprofileAndLogoutBtn hdr-button'>
								<img className='hdr-userprofileAndLogoutImg' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAx0lEQVRIS+2V0Q3CQAxDXydgBGATRqEbwEQwCiPABrBBmQBklEqhKpwruC+4n/uoYydOrmmofJrK/GSBFbADFqboGWiBwzt8FlDA3CTvYYpZugK3ALq2WfhMZgWkbC38bwtY8/CJRUOBPbABuvzhmwJq+jHehu7HcQT6abEsiQq2gCqqInANq2wBN3NVegLWYZVtkStQvcmjiThNflXB/1dR7O1ki/TEZ0XaZ8CltAGHK1Oj5m41kWvm7ZU5MXkP7q5Hj20EdQcvdDIZh0O7hwAAAABJRU5ErkJggg=="/>
								<span>Logout</span>
							</button>
						</div>
					</div>	

					<div id='appsBlock' className='hdr-invisible'>
						<div id='appsList'></div>
					</div>

					<div id='notificationBlock' className='hdr-invisible'>
						<ul id='notificationList'></ul>
						<a id='readAllBtn' className='hdr-noTextDecoration hdr-specialNotifBtn' href="">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABkElEQVRIS+2U7S0EURSGn60AHVABKqADdLAqQAWoABWgAlSACtABFaAC8kzOK9dmZzP+bEScZJLdO+e8X/feGTGHGs2Bg3+SH6X8a+LaBLaAtXoWgTfgsZ5r4H6WtVlOxsAhdIfjArgrUAkkklQB+8ArcARcTiObRuLwOfAObADrBe6873R1M7H2UG4WgN3mXcc5SaIalfk8lzrVWjqTPCWYDi1dOrsMnFYCZ2lsSRxQ6XZDYJ/DljGpNKWIlfqTnhC5T7pTyJeTKNKBYC14H8lLKZ/W657p6EMinWSDoypKdSTp0LgE1UFbXeSJSyeyHjRObLZJMo+rlTgFy5oinHc/Ujo5qaTGk3uyCuwUuAMSGJdAibFVKvBtiYsL166Ap0qp93QZYYb8bRR7dUx1J5BHWQG6z54qyhN4XDOdoL574pAXzGaPp6ACCuIJ8w4pwjVJderFXSr1ibKXJHHoQBDJBJTMCHLjjVZwiQW3N46+7f6QD2SA8u2Kk/bbpYDeGkIya37Qu3+SQTGl6e/E9QlOFWJ6RtIuVwAAAABJRU5ErkJggg=="/>
						</a>
						<a className='hdr-noTextDecoration hdr-specialNotifBtn' href="http://team.binary-studio.com/app/#/">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB30lEQVRYR+2W7VHCQBCGoQK1A60ArECsQK1ArECtAKwArMBYgXYAVqBWoFagVqDvw+w6R8jlQ0jyh5vZ4QJ3+z63Hxe6nZZHt2X9zhaACIxlP22lAgDEX2VfDUPsSq/nAMd6mDcMMJDezAGu9TBtGIDUjxwA7UR20RAEWudoOcCN5leyBxnRqKseyPudjJQT8b8I8AWi1MGbLdg0BOIz2YGM/C+e00XIl0DQGaTjZUMp6Vt0v02cwwGxAoAeEI+ynkViXQjEOfmTbGiRRicK4IdONDmRURPM/zMQJOf3Jh76KARgMYU5kZGOqhC+N9bipQCA8FMAULZNWUub5YGXBgDCHVIbOI11iLfZqe3JAy4FkO5bovEp87YNc+pttmfipIDiiwEXAlC9FBAOORHd4G26Y47nRoAzLrEPGXMixH4iBnBWS+cCIIg4b0nmYciBSGR0yLsB7OuTSufUWWuPDAIgH1GAqVZcyriex8GG9BRR4Bg4dpisLfgZmT/8MlYACDFhPJQNzWmOfuWfvDCftfNMtrigwtcxp+aqRHzd2y9Gh2gio4ZuZZPwdZyVw8rHLLEhrKGl1zF5anKgt/Q6njepLq1BWAPkPHa71cVFKvr+t7wukUK/ALQ6tgCtR+AX0EuQCjZ0KYUAAAAASUVORK5CYII="/>
						</a>
						<a className='hdr-noTextDecoration hdr-specialNotifBtn' href="http://team.binary-studio.com/app/#/settings">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACL0lEQVRYR9WXgVHDMAxF2wlgA8oEwASUDcoElAmADdIJgAkoE9BOQDegbFAmACYAPc7OqYocJ21zPXTna2NbX1+yJCf93mbyIGo3RnUiz0VbuH5bhbB/Ib/nRncuz6O2eJsS+BRDh8bYSp6Pd0XgVIBeZNzJmBlQDEPAE88honIv41LG0ip5Chh/VR5OA5GvoMzZkwOeXMsk+xGIYngcntG/sCQsAWs8GlkFYMAGCeN6LwTZC56WCglLAENHGQPbLr9rYpbAUBYJf5fCMSyiAS8HvBrfFaFHAbrVYB4BkgeGJ7uyGnDWQl8XAda6iAIlXameVCPyGo0NCB7FuibbcxEjwSuNyhIg/FceU2X9W/4Xzh7OlvmDmqMbyxotO/aUHgRoFnjAsO3Vw9LNxq5DArycQIDoLSHwk9ut1t1EMvoA546jVGlL4Fk0CWOdTGWRY2wk/44A4T3LuPYW8qlxBIqgQBI2uQfceg7Wmibhh05CyzQHQgZDmraqhWua+bpKqlRQqhGtGkTjr4wCg1jGdWHH64HdkCKw11ZMCEmkCttGWZXeRLS4issuyFYvAk8yP97SWEo9ex2PRJOX0S6Fl9NZNLCPV7K1ZPReShfCzt5o3AFTGZRorldggCTmGO2dwE06lBGrx80BSkqTsOcGMHniia1zXU0V4wCkyhAS0WPIaKFK2nyY4DFY5FfpeQRMEUg4WE5TSvaY3EaTA9qUAFHZ68ep1yknQqrIeWzXfwFZJHIs2+DwVAAAAABJRU5ErkJggg==" />
						</a>
					</div>
				</div>
			</header>
			)
	}
}

function mapStateToProps(state) {
	let localRole = state.myState.me.localRole || '';
	let mentor = state.myState.me.mentor;
	let userInfo = state.myState.me.userInfo || {};
	let { firstName, lastName, globalRole, email } = userInfo;
 
	return {
		firstName,
		lastName,
		localRole,
		globalRole,
		email,
		mentor
	};
}

const SharedHeaderConnected = connect(mapStateToProps)(SharedHeader);

export default SharedHeaderConnected;

var getHeader = function() {
var request = new XMLHttpRequest();
request.open('GET', 'http://team.binary-studio.com/app/header', true);
    request.send();
    request.onreadystatechange = function() {
        if (request.readyState != 4) return;
        if (request.status != 200) {
            alert(request.status + ': ' + request.statusText);
        } else {
           var headerHtml = request.responseText;
           var headerContainer = document.getElementById('header');
           headerContainer.innerHTML =headerHtml;
           headerFunction();
        }
    };
};
