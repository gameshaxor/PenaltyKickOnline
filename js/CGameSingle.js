var CGameSingle=function(e,i){CGameBase.call(this,e,i),this._init(i)};CGameSingle.prototype=Object.create(CGameBase.prototype),CGameSingle.prototype._init=function(e){CGameBase.prototype._init(e),this._startGame()},CGameSingle.prototype._startGame=function(){s_oGameStriker=this._oCurScenario=new CGameStrikerSingle(this._oContainerGame,this._iCurLevel),this._oQuizPanel.addEventListener(ON_ANSWER,this._onAnswer,this),this._oQuizPanel.addEventListener(ON_QUIZ_TIMEOUT,this._onQuizTimeout,this),this._oInterface.showVsPanel(s_aMatches[this._iCurLevel-1],this._iCurLevel),this.setPlayersName()},CGameSingle.prototype.onBeginShot=function(){this.checkMatchPoint()&&s_oInterface.showMatchPointText(TEXT_MATCHPOINT)},CGameSingle.prototype.changeScenario=function(){this._bBonusShot=!1,this.tryIncreaseStage();var e=this.checkPlayerWins(),i=this.checkOpponentWins(),t=e||i;if(this._iNumKicks++,t){this._aResults.push({player:this._iPlayerGoals,cpu:this._iOpponentGoals});var s=!1;this._iPlayerGoals<this._iOpponentGoals&&(s=!0);var n=!1;this._iCurLevel===NUM_MATCHES?n=!0:s||s_oMain.saveLevel(this._iCurLevel+1),stopSound("crowd"),e&&(this._iNumKicks-1===NUM_KICKS?this._iLevelScore=SCORE_NORMAL:this._iNumKicks-1<NUM_KICKS?this._iLevelScore=SCORE_BONUS:this._iLevelScore=SCORE_NOBONUS),this._iTotScore+=this._iLevelScore,$(s_oMain).trigger("end_level",this._iCurLevel),this._oInterface.setFinalPanel(),this._oInterface.showFinalPanel(this._iPlayerGoals+"-"+this._iOpponentGoals,this._iTotScore,this._iLevelScore,s,n),e&&s_oMain.saveMatch(this._iCurLevel,s_aMatches[this._iCurLevel-1],this._iPlayerGoals+"-"+this._iOpponentGoals,this._iLevelScore,this._iTotScore)}else this._oCurScenario.unload(),this._oCurScenario=null,s_iCurState===STRIKER_MODE?(s_iCurState=GOALKEEPER_MODE,refreshSettings(s_iCurState),this._iNumKicks>NUM_KICKS&&(this._bExtraPenalty=!0,BALL_FORCE_Y[this._iCurLevel]<HIT_BALL_MAX_FORCE&&(BALL_FORCE_Y[this._iCurLevel]+=2)),s_oGameKeeper=this._oCurScenario=new CGameGoalkeeperSingle(this._iCurLevel,BALL_FORCE_Y[this._iCurLevel-1],this._oContainerGame)):(s_iCurState=STRIKER_MODE,refreshSettings(s_iCurState),this._iNumKicks>NUM_KICKS&&(this._bExtraPenalty=!0),s_oGameStriker=this._oCurScenario=new CGameStrikerSingle(this._oContainerGame,this._iCurLevel)),0===this._iRemainingPlayerKicks&&0===this._iRemainingOpponentKicks&&this.setExtraPenalty(),this.onBeginShot()},CGameSingle.prototype.setBonusShotScenario=function(){this._oCurScenario.unload(),this._oCurScenario=null,s_iCurState=STRIKER_MODE,refreshSettings(s_iCurState),this._iNumKicks>NUM_KICKS&&(this._bExtraPenalty=!0),s_oGameStriker=this._oCurScenario=new CGameStrikerSingle(this._oContainerGame,this._iCurLevel),s_oGameStriker.setBonusShot(),this.onBeginShot()},CGameSingle.prototype.setBonusKeeperScenario=function(){this._oCurScenario.unload(),this._oCurScenario=null,s_iCurState=GOALKEEPER_MODE,refreshSettings(s_iCurState),this._iNumKicks>NUM_KICKS&&(this._bExtraPenalty=!0,BALL_FORCE_Y[this._iCurLevel]<HIT_BALL_MAX_FORCE&&(BALL_FORCE_Y[this._iCurLevel]+=2)),s_oGameKeeper=this._oCurScenario=new CGameGoalkeeperSingle(this._iCurLevel,BALL_FORCE_Y[this._iCurLevel-1],this._oContainerGame),s_oGameKeeper.setBonusShot(),this.onBeginShot()},CGameSingle.prototype._onAnswer=function(e){this._oQuizPanel.setAnswer(e)},CGameSingle.prototype._onQuizTimeout=function(){this._oQuizPanel.setAnswer(-1)},CGameSingle.prototype.setPlayersName=function(){var e=TEXT_TEAM[s_iTeamSelected],i=TEXT_TEAM[s_aMatches[this._iCurLevel-1]];this._oInterface.setPlayersInfo(e,i)},CGameSingle.prototype.isStartingUser=function(){return s_iCurState===STRIKER_MODE},CGameSingle.prototype.retryLevel=function(){this._iCurLevel--,this.nextRound(),this._oInterface.hideFinalPanel(),$(s_oMain).trigger("restart_level",this._iCurLevel)},CGameSingle.prototype.onExit=function(){this.unload(),$(s_oMain).trigger("show_interlevel_ad"),$(s_oMain).trigger("end_session"),isPlaying("soundtrack")||playSound("soundtrack",SOUNDTRACK_GENERAL_VOLUME,!0),stopSound("crowd"),s_oMain.gotoMenu()},CGameSingle.prototype.nextRound=function(){this._iCurLevel++,this.reset(),this._oCurScenario.unload(),this._oCurScenario=null,this._oResultPanel.update(this._iCurLevel),this.setPlayersName(),this._oInterface.reset(s_aMatches[this._iCurLevel-1],this._iCurLevel),this._oInterface.showVsPanel(s_aMatches[this._iCurLevel-1],this._iCurLevel),this._oInterface.hideFinalPanel(),this._oResultPanel.reset(),s_oGameStriker=this._oCurScenario=new CGameStrikerSingle(this._oContainerGame,this._iCurLevel),this.onBeginShot()};