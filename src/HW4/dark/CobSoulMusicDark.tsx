import React, { FC, ReactNode } from 'react';

import '../CobSoulMusic.css';
import CobSoulMusicCommentsDark from './CobSoulMusicCommentsDark';
import CobSoulMusicSelectionContainerDark from './CobSoulMusicSelectionContainerDark';
import CobSoulMusicFavoritesMenuDark from './CobSoulMusicFavoritesMenuDark';
import CobSoulMusicHeaderDark from './CobSoulMusicHeaderDark';
import CobSoulMusicSearchMenuDark from './CobSoulMusicSearchMenuDark';

import CobSoulMusicSignInPopupDark from './CobSoulMusicSignInPopupDark';
import CobSoulMusicNowPlayingDark from './CobSoulMusicNowPlayingDark';
import CobSoulMusicBannerAdDark from './CobSoulMusicBannerAdDark';
import CobSoulMusicSignInTosDark from './CobSoulMusicSignInToSDark';
import { Checkbox, Container, Divider, Header, Label, Segment } from 'semantic-ui-react';
import CobSoulMusicPopupAdDark from './CobSoulMusicPopupAdDark';
import CobSoulMusicPopupBuyDark from './CobSoulMusicPopupBuyDark';

interface CobSoulMusicDarkProps {

}

export interface CobSoulMusicFilters {
    genre: string,
    artist: string,
    sortByKey: string,
    selectedFavorite:string | undefined
}
interface CobSoulMusicDarkStates {
    signInPopup: boolean
    signedIn: boolean
    playingSong: string | null
    songDescription: string | null
    favorites: string[]
    bonusSongsUnlocked: number
    showTerms: boolean
    filters: CobSoulMusicFilters
    showVideoPopup: boolean
    freeSongs: number
    songsListened: number
    questsComplete: number
    boughtAutoPlays: boolean
    autoPlaysEnabled: boolean
    autoPlays: number
    adSkips: number
    wonAdSkip: boolean
    showWinAdSkip: boolean
    showBuy: boolean
    showBuyAutoPlays: boolean
    boughtAdSkips:boolean
}
export default class CobSoulMusicDark extends React.Component<CobSoulMusicDarkProps, CobSoulMusicDarkStates>{
    constructor(props: CobSoulMusicDarkProps) {
        super(props);
        this.state = {
            signInPopup: false,
            signedIn: false,
            playingSong: null,
            songDescription: null,
            favorites: [],
            bonusSongsUnlocked: 0,
            showTerms: false,
            filters: {
                genre: "All",
                artist: "All",
                sortByKey: "MostPlays",
                selectedFavorite:undefined
            },
            showVideoPopup: false,
            freeSongs: Math.round(((3 * Math.random()) + 1)),
            songsListened: 0,
            questsComplete: 0,
            boughtAutoPlays: false,
            boughtAdSkips:false,
            adSkips: 0,
            wonAdSkip: false,
            showWinAdSkip: false,
            showBuy: false,
            autoPlays: 0,
            autoPlaysEnabled: false,
            showBuyAutoPlays:false
        }
        this.updateNowPlaying = this.updateNowPlaying.bind(this);
        this.addToFavorite = this.addToFavorite.bind(this);
        this.removeFromFavorite = this.removeFromFavorite.bind(this);
        this.setVideoPopups = this.setVideoPopups.bind(this);
        this.buyAutoPlays = this.buyAutoPlays.bind(this);
        this.setVideoPopups();

    }
    private darkModeReq: number = 7;
    private vidPopups: ReactNode[] = [];
    private bonusSongsTotal: number = 50;
    updateNowPlaying(songName: string, description: string, autoPlays:number) {
        let q = this.state.questsComplete;
        
        let a  = this.state.autoPlays;

        if(autoPlays){
           a = autoPlays; 
        }

        if (this.state.songsListened + 1 == this.darkModeReq) {
            q++;
        }
        this.setState({ playingSong: songName, songDescription: description, songsListened: this.state.songsListened + 1, questsComplete: q, autoPlays:a });
    }
    removeFromFavorite(songName: string) {
        let favs = this.state.favorites;
        if (favs.includes(songName)) {
            favs = favs.filter((v) => v !== songName);
        }
        console.log(favs);
        this.setState({ favorites: favs });
    }
    addToFavorite(songName: string) {
        let favs = this.state.favorites;
        if (!favs.includes(songName)) {
            favs.push(songName);
        }
        console.log(favs);
        this.setState({ favorites: favs });
    }

    setVideoPopups() {
        this.vidPopups = [
            <CobSoulMusicPopupAdDark adSkips={this.state.adSkips} openUp={this.state.showVideoPopup} onClose={(adSkips: number) => {
                this.setState({ showVideoPopup: false, adSkips: adSkips });
            }} srcId={'G-T3qKl6y-c'} desc={'Get your grub!'} head={'Grubhub - Delivery'} length={15}></CobSoulMusicPopupAdDark>,
            <CobSoulMusicPopupAdDark adSkips={this.state.adSkips} openUp={this.state.showVideoPopup} onClose={(adSkips: number) => {
                this.setState({ showVideoPopup: false, adSkips: adSkips });
            }} srcId={'unrgBTWjM_U'} desc={'Cookies greater than cake!'} head={"Chips Ahoy! 'Birthday'"} length={11}></CobSoulMusicPopupAdDark>,
            <CobSoulMusicPopupAdDark adSkips={this.state.adSkips} openUp={this.state.showVideoPopup} onClose={(adSkips: number) => {
                this.setState({ showVideoPopup: false, adSkips: adSkips });
            }} srcId={'0xzN6FM5x_E'} desc={'The power of Flex Tape!'} head={"FLEX TAPE??"} length={61}></CobSoulMusicPopupAdDark>
        ]
    }
    buyAutoPlays() {
        if (!this.state.showBuyAutoPlays) {
            this.setState({ showBuyAutoPlays: true });
        }
    }
    buyAdSkips() {
        if (!this.state.showBuy) {
            this.setState({ showBuy: true });
        }
    
    }
    winAdSkip() {
        this.setState({ showWinAdSkip: true });
    }
    render(): React.ReactNode {
        this.setVideoPopups();
        let nextAd = this.vidPopups[Math.floor(Math.random() * this.vidPopups.length)];
        console.log(nextAd);

        return (
            <>
                <div className='HW4Main-Dark'>

                    <CobSoulMusicHeaderDark></CobSoulMusicHeaderDark>

                    <div className={`HW4Main-Dark-Container${this.state.songsListened >= this.darkModeReq ? "--DarkMode" : ""}`}>
                        <div className='HW4Main-Dark-Container-Inner'>
                            <div className='HW4-Flex HW4-JustifyContentCenter HW4-Margin1'>
                                <div className='HW4Main-DarkHeaderContainer HW4-100Width'>
                                    <h1 className='HW4Main-Dark-Header'>
                                        Cob's Soul Music

                                    </h1>
                                    <CobSoulMusicFavoritesMenuDark


                                    onUpdate={(selectedFavorite:string|undefined)=>{
                                        let nf = this.state.filters;
                                        nf.selectedFavorite = selectedFavorite;
                                        
                                        console.log(selectedFavorite);
                                        this.setState({ filters: nf });
                                    }}
                                    favorites={this.state.favorites}></CobSoulMusicFavoritesMenuDark>
                                </div>

                            </div>


                            <div className='HW4-AdStatement' onClick={() => {
                                window.open("http://www.dolekemp96.org/agenda/issues/internet.htm", "_blank")
                            }
                            }>
                                Zombie Bob Dole 2024
                            </div>
                            <CobSoulMusicBannerAdDark src="ad4.gif" link="http://www.dolekemp96.org/agenda/issues/internet.htm"></CobSoulMusicBannerAdDark>
                            <CobSoulMusicSearchMenuDark darkMode={this.state.songsListened >= this.darkModeReq} onUpdate={(newFilter: CobSoulMusicFilters) => {
                                this.setState({ filters: newFilter });
                                console.log("Changed filter: " + newFilter.artist)
                            }} lastFiler={this.state.filters}></CobSoulMusicSearchMenuDark>

                            <CobSoulMusicSelectionContainerDark
                                onAutoPlay={(songName:string, songDescription:string,autoPlays:number)=>{
                                    this.updateNowPlaying(songName, songDescription, autoPlays)
                                }}
                                selectedFavorite={this.state.filters.selectedFavorite}
                                autoPlayEnabled={this.state.autoPlaysEnabled}
                                autoPlays={this.state.autoPlays}
                                favorites={this.state.favorites}
                                onAddToFavorite={this.addToFavorite}
                                sortBy={this.state.filters.sortByKey}
                                onMusicStop={(swapedSongs: boolean) => {

                                    let fs = this.state.freeSongs - 1;
                                    let showAd = fs <= 0;
                                    if (showAd) {
                                        fs = Math.round(((3 * Math.random()) + 1));
                                    }
                                    if (!swapedSongs) {

                                        this.setState({ playingSong: null, showVideoPopup: showAd, freeSongs: fs });
                                    } else {
                                        this.setState({ showVideoPopup: showAd, freeSongs: fs });
                                    }
                                    console.log("Free songs " + this.state.freeSongs);
                                }}
                                onRemoveFromFavorite={this.removeFromFavorite}

                                onReallyPlay={ (songName:string, songDescription:string)=>{this.updateNowPlaying(songName, songDescription, this.state.autoPlays)}}
                                onMusicPlay={() => { console.log("Trigger Popup!"); this.setState({ signInPopup: true }); this.forceUpdate(); }}
                                signedIn={this.state.signedIn} filteredGenre={this.state.filters.genre} filteredArtist={this.state.filters.artist}></CobSoulMusicSelectionContainerDark>
                            {(this.state.autoPlays > 0) && <>
                                <div className='HW4-Flex HW4-FlexRow HW4-AlignItemsCenter HW4-JustifyContentCenter'>
                                    <Checkbox toggle onChange={(e, d) => {
                                        this.setState({ autoPlaysEnabled: d.checked as boolean });
                                    }}></Checkbox>
                                    <div className={`HW4-MarginLeftRight1 HW4-AutoPlayToggleText ${this.state.songsListened >= this.darkModeReq ? "HW4-DarkModeWhite" : " "} `}>
                                        Auto-Play, <span>{this.state.autoPlays} </span>Remaining
                                    </div>

                                </div></>}

                            <div className='HW4-Flex HW4-FlexColumn'>

                                <div className='HW4-AdStatement'>
                                    Cereal Flakes, ???Asbestos free???
                                </div>
                                <div className='HW4-AdStatement'>
                                    Jim???s Brake Pads, ???They work every time, 50% of the time???
                                </div>
                            </div>
                            <Segment inverted>
                                <Header>Daily Quests ({this.state.questsComplete}/3 Complete)</Header>
                                <Container text>
                                    <ul>
                                        {!this.state.wonAdSkip &&
                                            <li onClick={() => { this.winAdSkip() }} className="HW4-Clickable">
                                                <span>WIN <span className='HW4-Green HW4-Bolder'>2</span> ad skips by watching an ad! <span className='HW4-Red'>(1 Left)</span></span>
                                            </li>
                                        }
                                        {this.state.songsListened < this.darkModeReq &&
                                            <li className="HW4-Clickable">
                                                <span>Unlock DARK mode by listening to {this.darkModeReq - this.state.songsListened} more songs!</span>
                                            </li>
                                        }
                                            <li className="HW4-Clickable" onClick={() => { this.buyAdSkips() }}>
                                                <span>Get 26 ad skips <span className='HW4-Smaller HW4-Strike HW4-Yellow'>$5.99</span> <span className='HW4-Red'>$3.99</span></span>
                                            </li>
                 
                                    </ul>
                                    <div className="HW4-Clickable" onClick={() => { this.buyAutoPlays() }}>
                                        <span>Unlock 25 Auto Plays for <span className='HW4-Smaller HW4-Strike HW4-Yellow'>$13.99</span> <span className='HW4-Red'>$9.99</span></span>
                                    </div>
                                </Container>
                            </Segment>



                            <Divider></Divider>
                            <Segment basic>
                                <CobSoulMusicCommentsDark></CobSoulMusicCommentsDark></Segment>
                            {this.state.playingSong && <>
                                <CobSoulMusicNowPlayingDark onAddToFavorite={this.addToFavorite} inFavs={this.state.favorites.includes(this.state.playingSong)}
                                    onRemoveFromFavorite={this.removeFromFavorite}
                                    description={this.state.songDescription} songName={this.state.playingSong} ></CobSoulMusicNowPlayingDark>
                            </>}
                        </div>
                    </div>
                    <CobSoulMusicSignInTosDark openUp={this.state.showTerms} onClose={
                        () => {
                            this.setState({ showTerms: false });
                        }
                    }></CobSoulMusicSignInTosDark>
                    <CobSoulMusicSignInPopupDark
                        openUp={this.state.signInPopup}
                        onSignIn={() => {
                            console.log("Signed in");
                            this.setState({ signedIn: true, signInPopup: false })
                        }}
                        onShowTerms={
                            () => {
                                this.setState({ showTerms: true });
                                console.log(this.state.showTerms);
                            }
                        }
                    >
                    </CobSoulMusicSignInPopupDark>
                    {nextAd}
                    <CobSoulMusicPopupAdDark adSkips={this.state.adSkips} openUp={this.state.showWinAdSkip} onClose={() => {
                        this.setState({ showWinAdSkip: false, wonAdSkip: true, adSkips: this.state.adSkips + 2, questsComplete: this.state.questsComplete + 1 });
                    }} srcId={'G-T3qKl6y-c'} desc={'Get your grub!'} head={'Grubhub - Delivery'} length={15}></CobSoulMusicPopupAdDark>

                    <CobSoulMusicPopupBuyDark openUp={this.state.showBuy} onClose={() => {
                        let q = this.state.questsComplete;
                        if(!this.state.boughtAdSkips){
                            q++;
                        }
                        this.setState({ showBuy: false, adSkips: this.state.adSkips + 26, boughtAdSkips:true,questsComplete:q });
                    }} price={3.99} desc={'26 Ad skips'} head={'26 Ad skips'}>

                    </CobSoulMusicPopupBuyDark>

                    <CobSoulMusicPopupBuyDark openUp={this.state.showBuyAutoPlays} onClose={() => {
                        this.setState({ showBuyAutoPlays:false,boughtAutoPlays:true,  autoPlays:this.state.autoPlays + 25});
                    }} price={9.99} desc={'25 Autoplays'} head={'25 Autoplays'}>

                    </CobSoulMusicPopupBuyDark>

                </div>
            </>);
    }
}