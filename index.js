import React, { useContext, useEffect, useState } from "react";
import style from "./css/wingo.module.css";
import { WalletViewEffect } from "../WalletViewEffect";
import WalletDataForGames from "../WalletDataForGames";
import Notice from "../Notice";
import logoActive from "../../icons/time_a-f83ed4c7.png";
import logoInactive from "../../icons/time-5d4e96a3.png";
import green from "../../icons/green.png";
import red from "../../icons/red.png";
import redVilet from "../../icons/redviolet.png";
import greenViolet from "../../icons/greenviolet.png";
import number0 from "../../icons/n0-30bd92d1.png";
import number1 from "../../icons/n1-dfccbff5.png";
import number2 from "../../icons/n2-c2913607.png";
import number3 from "../../icons/n3-f92c313f.png";
import number4 from "../../icons/n4-cb84933b.png";
import number5 from "../../icons/n5-49d0e9c5.png";
import number6 from "../../icons/n6-a56e0b9a.png";
import number7 from "../../icons/n7-5961a17f.png";
import number8 from "../../icons/n8-d4d951a4.png";
import number9 from "../../icons/n9-a20f6f42.png";

import { NavLink } from "react-router-dom";
import { data } from "../../store/Contextprovider";

import UserbetHistorycard from "./UserbetHistorycard";
import Loader from "../Loader";
import Nodata from "./Nodata";
function Wingo30sec() {
  const {
    uid,
    setWingo30secbet,
    userfinance,
    get30secwingo,
    getUserfinances,
    WingoServerData30s,
    ws,
    Wingouserbethistory30sec,
    GetWingobetHistory30sec,
  } = useContext(data);

  function getbethistory() {
    setTimeout(() => {
      GetWingobetHistory30sec(String(window.sessionStorage.getItem("uid")));
    }, 500);
  }
  const [currentmin, changeCurrentmin] = useState();
  const [blocker, changeblocker] = useState("no");
  const [currentsec, changesec] = useState("10");
  const [selection, changeSelection] = useState("Big");
  const [balanceSelection, changeBalanceSelection] = useState(1);
  const [MultiplierSelection, changeMultiplierSelection] = useState(1);
  const [quantity, changeQuantity] = useState(1);
  const [BetTab, changeBetTab] = useState("off");
  const [upcomingperiod, changeupcomingperiod] = useState();
  const [tab, change] = useState("serverhistory");
  const [cdata, changecdata] = useState("serverhistory");
  const [showloader, setShowLoader] = useState(false);
  function changeData(args) {
    change(args);
    changecdata(args);
  }
  function periodchanger() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes() + 1;
    // generate new random int between 0 and 9
    let period = `${year}${month}${day}${hour == 0 ? `00` : hour}${
      min == 0 ? `60` : min < 10 ? "0" + min : min
    }${date.getSeconds() > 30 ? 2 : 1}`;
    changeupcomingperiod(period);
  }
  useEffect(() => {
    get30secwingo();
    getUserfinances(String(window.sessionStorage.getItem("uid")));
    GetWingobetHistory30sec(String(window.sessionStorage.getItem("uid")));
    setTimeout(() => {
      periodchanger();
    }, 1000);
    setInterval(() => {
      let date = new Date();
      if (date.getSeconds() == 59) {
        get30secwingo();
        getUserfinances(String(window.sessionStorage.getItem("uid")));
        GetWingobetHistory30sec(String(window.sessionStorage.getItem("uid")));
        setTimeout(() => {
          periodchanger();
        }, 2000);
      }
      if (date.getSeconds() == 29) {
        get30secwingo();
        getUserfinances(String(window.sessionStorage.getItem("uid")));
        GetWingobetHistory30sec(String(window.sessionStorage.getItem("uid")));
        setTimeout(() => {
          periodchanger();
        }, 2000);
      }
    }, 1000);
  }, []);

  ws.on("message", (msg) => {
    changeCurrentmin(msg.minute);
    if (msg.seconds < 30) {
      changesec(Math.abs(msg.seconds - 30).toString());
      if (msg.seconds >= 25) {
        changeblocker("yes");
        changeBetTab("off");
      } else {
        changeblocker("no");
      }
    }
    if (msg.seconds > 30) {
      changesec(Math.abs(msg.seconds - 60).toString());
      if (msg.seconds >= 55) {
        changeblocker("yes");
        changeBetTab("off");
      } else {
        changeblocker("no");
      }
    }
  });
  return (
    <div style={{ position: "relative" }}>
      {" "}
      {showloader && <Loader />}{" "}
      <WalletViewEffect>
        <WalletDataForGames></WalletDataForGames>
        <Notice></Notice>
        {/* wingo timer for one minutes setting */}
        <div className={style.GameTimer}>
          <NavLink
            to="/wingo"
            className={style.Options}
            style={{ backgroundColor: "orange", color: "white" }}
          >
            <img
              alt="img"
              id="one"
              className={style.OptionsImage}
              src={logoActive}
            />
            <div class="count">
              <p>Win Go</p>
              <p>30sec</p>
            </div>
          </NavLink>
          <NavLink to="/wingo1min" className={style.Options}>
            <img
              alt="img"
              id="one"
              className={style.OptionsImage}
              src={logoInactive}
            />
            <div class="count">
              <p>Win Go</p>
              <p>1Min</p>
            </div>
          </NavLink>
          <NavLink to="/wingo3min" className={style.Options}>
            <img
              alt="img"
              id="one"
              className={style.OptionsImage}
              src={logoInactive}
            />
            <div class="count">
              <p>Win Go</p>
              <p>3Min</p>
            </div>
          </NavLink>
          <NavLink to="/wingo5min" className={style.Options}>
            <img
              alt="img"
              id="one"
              className={style.OptionsImage}
              src={logoInactive}
            />
            <div class="count">
              <p>Win Go</p>
              <p>5Min</p>
            </div>
          </NavLink>
        </div>
        {/* time selection info ends here */}
      </WalletViewEffect>
      {/*timer section */}
      <div className={style.timer}>
        <div class={style.twosectionsspl}>
          <p className={style.insts}>How to play</p>
          <p className={style.selectedsetting}>Win Go 30sec</p>

          {WingoServerData30s.length > 5 && (
            <div className={style.peek}>
              <div className={style.peekitem}>
                <img
                  className={style.peekresult}
                  src={
                    WingoServerData30s[0].number == "0 "
                      ? number0
                      : WingoServerData30s[0].number == "1"
                      ? number1
                      : WingoServerData30s[0].number == "2"
                      ? number2
                      : WingoServerData30s[0].number == "3"
                      ? number3
                      : WingoServerData30s[0].number == "4"
                      ? number4
                      : WingoServerData30s[0].number == "5"
                      ? number5
                      : WingoServerData30s[0].number == "6"
                      ? number6
                      : WingoServerData30s[0].number == "7"
                      ? number7
                      : WingoServerData30s[0].number == "8"
                      ? number8
                      : WingoServerData30s[0].number == "9"
                      ? number9
                      : number0
                  }
                />
              </div>

              <div className={style.peekitem}>
                <img
                  className={style.peekresult}
                  src={
                    WingoServerData30s[1].number == "0 "
                      ? number0
                      : WingoServerData30s[1].number == "1"
                      ? number1
                      : WingoServerData30s[1].number == "2"
                      ? number2
                      : WingoServerData30s[1].number == "3"
                      ? number3
                      : WingoServerData30s[1].number == "4"
                      ? number4
                      : WingoServerData30s[1].number == "5"
                      ? number5
                      : WingoServerData30s[1].number == "6"
                      ? number6
                      : WingoServerData30s[1].number == "7"
                      ? number7
                      : WingoServerData30s[1].number == "8"
                      ? number8
                      : WingoServerData30s[1].number == "9"
                      ? number9
                      : number0
                  }
                />
              </div>

              <div className={style.peekitem}>
                <img
                  className={style.peekresult}
                  src={
                    WingoServerData30s[2].number == "0 "
                      ? number0
                      : WingoServerData30s[2].number == "1"
                      ? number1
                      : WingoServerData30s[2].number == "2"
                      ? number2
                      : WingoServerData30s[2].number == "3"
                      ? number3
                      : WingoServerData30s[2].number == "4"
                      ? number4
                      : WingoServerData30s[2].number == "5"
                      ? number5
                      : WingoServerData30s[2].number == "6"
                      ? number6
                      : WingoServerData30s[2].number == "7"
                      ? number7
                      : WingoServerData30s[2].number == "8"
                      ? number8
                      : WingoServerData30s[2].number == "9"
                      ? number9
                      : number0
                  }
                />
              </div>

              <div className={style.peekitem}>
                <img
                  className={style.peekresult}
                  src={
                    WingoServerData30s[3].number == "0 "
                      ? number0
                      : WingoServerData30s[3].number == "1"
                      ? number1
                      : WingoServerData30s[3].number == "2"
                      ? number2
                      : WingoServerData30s[3].number == "3"
                      ? number3
                      : WingoServerData30s[3].number == "4"
                      ? number4
                      : WingoServerData30s[3].number == "5"
                      ? number5
                      : WingoServerData30s[3].number == "6"
                      ? number6
                      : WingoServerData30s[3].number == "7"
                      ? number7
                      : WingoServerData30s[3].number == "8"
                      ? number8
                      : WingoServerData30s[3].number == "9"
                      ? number9
                      : number0
                  }
                />
              </div>

              <div className={style.peekitem}>
                <img
                  className={style.peekresult}
                  src={
                    WingoServerData30s[4].number == "0 "
                      ? number0
                      : WingoServerData30s[4].number == "1"
                      ? number1
                      : WingoServerData30s[4].number == "2"
                      ? number2
                      : WingoServerData30s[4].number == "3"
                      ? number3
                      : WingoServerData30s[4].number == "4"
                      ? number4
                      : WingoServerData30s[4].number == "5"
                      ? number5
                      : WingoServerData30s[4].number == "6"
                      ? number6
                      : WingoServerData30s[4].number == "7"
                      ? number7
                      : WingoServerData30s[4].number == "8"
                      ? number8
                      : WingoServerData30s[4].number == "9"
                      ? number9
                      : number0
                  }
                />
              </div>
            </div>
          )}
        </div>
        <div class={style.twosectionSpll}>
          <p className={style.timenotice}>Time remaining</p>
          <p className={style.time}>
            <b>
              <span className={style.min} id="min_first">
                0
              </span>
              <span className={style.min} id="min_sec">
                0
              </span>
              <span className={style.min} id="min_colen">
                :
              </span>
              <span className={style.min} id="second_first">
                {currentsec.length == "2"
                  ? currentsec[0]
                  : currentsec.length == "1" && "0"}
              </span>
              <span className={style.min} id="second_second">
                {currentsec.length == "2"
                  ? currentsec[1]
                  : currentsec.length == "1" && currentsec[0]}
              </span>
            </b>
          </p>
          <p className={style.currentround}>{upcomingperiod}</p>
        </div>
      </div>
      {/* wingo color options  */}
      <div className={style.ColoOptions}>
        {/* this is blocker overlay */}
        <div className={blocker == "yes" ? style.blocker : style.offblocker}>
          <div className={style.middlecontainer}>
            <h1>0</h1>
            <h1>{currentsec}</h1>
          </div>
        </div>
        <button
          className={style.green}
          onClick={() => {
            changeSelection("green");
            changeBetTab("on");
          }}
        >
          Green
        </button>
        <button
          className={style.violet}
          onClick={() => {
            changeSelection("violet");
            changeBetTab("on");
          }}
        >
          Violet
        </button>
        <button
          className={style.red}
          onClick={() => {
            changeSelection("red");
            changeBetTab("on");
          }}
        >
          Red
        </button>

        <div
          className={style.numberSections}
          style={{
            marginTop: "15px",
            borderRadius: "10px 10px 0 0",
          }}
        >
          <img
            src={number0}
            alt="small_zero"
            onClick={() => {
              changeSelection(0);
              changeBetTab("on");
            }}
          />
          <img
            src={number1}
            alt="small_one"
            onClick={() => {
              changeSelection(1);
              changeBetTab("on");
            }}
          />
          <img
            src={number2}
            alt="small_three"
            onClick={() => {
              changeSelection(2);
              changeBetTab("on");
            }}
          />
          <img
            src={number3}
            alt="small_four"
            onClick={() => {
              changeSelection(3);
              changeBetTab("on");
            }}
          />
          <img
            src={number4}
            alt="small_four"
            onClick={() => {
              changeSelection(4);
              changeBetTab("on");
            }}
          />
        </div>

        <div
          className={style.numberSections}
          style={{ borderRadius: "0px 0px 10px 10px", height: "69px" }}
        >
          <img
            src={number5}
            alt="small_five"
            onClick={() => {
              changeSelection(5);
              changeBetTab("on");
            }}
          />
          <img
            src={number6}
            alt="small_six"
            onClick={() => {
              changeSelection(6);
              changeBetTab("on");
            }}
          />
          <img
            src={number7}
            alt="small_seven"
            onClick={() => {
              changeSelection(7);
              changeBetTab("on");
            }}
          />
          <img
            src={number8}
            alt="small_four"
            onClick={() => {
              changeSelection(8);
              changeBetTab("on");
            }}
          />
          <img
            src={number9}
            alt="small_four"
            onClick={() => {
              changeSelection(9);
              changeBetTab("on");
            }}
          />
        </div>

        <div className={style.Randoms}>
          <p
            id="random"
            className={style.Tabs}
            style={{
              backgroundColor: "white",
              color: "red",
              border: "1px solid red",
              borderRadius: "10px",
              width: "25%",
              padding: "7px 5px",
            }}
          >
            Random
          </p>
          <p className={style.Tabs}>x1</p>
          <p className={style.Tabs}>x5</p>
          <p className={style.Tabs}>x10</p>
          <p className={style.Tabs}>x20</p>
          <p className={style.Tabs}>x50</p>
          <p className={style.Tabs}>x100</p>
        </div>
        <div className={style.BetBigSmall}>
          <b>
            <p
              onClick={() => {
                changeSelection("Big");
                changeBetTab("on");
              }}
              style={{ backgroundColor: "orange" }}
            >
              Big
            </p>
            <p
              onclick="selection_color('small')"
              style={{ backgroundColor: "#6ea8f4" }}
              onClick={() => {
                changeSelection("Small");
                changeBetTab("on");
              }}
            >
              Small
            </p>
          </b>
        </div>
      </div>
      {/* result section*/}
      <div className={style.GamesStat}>
        {cdata === "serverhistory" ? (
          <div
            onClick={() => {
              changeData("serverhistory");
            }}
            className={style.historyCommon}
            style={{
              backgroundColor: "orange",
              textAlign: "center",
              color: "white",
              marginRight: "10px",
              fontSize: "small",
              width: "108px",
            }}
          >
            History
          </div>
        ) : (
          <div
            onClick={() => {
              changeData("serverhistory");
            }}
            className={style.historyCommon}
            style={{
              backgroundColor: "white",
              textAlign: "center",
              color: "black",
              marginRight: "10px",
              fontSize: "small",
              width: "108px",
            }}
          >
            History
          </div>
        )}
        {cdata === "chart" ? (
          <div
            onClick={() => {
              changeData("chart");
            }}
            id="chart"
            className={style.historyCommon}
            style={{
              width: "100px",
              textAlign: "center",
              margin: "0 14px",
              fontSize: "small",
              backgroundColor: "orange",
              color: "white",
            }}
          >
            Chart
          </div>
        ) : (
          <div
            onClick={() => {
              changeData("chart");
            }}
            id="chart"
            className={style.historyCommon}
            style={{
              width: "100px",
              textAlign: "center",
              margin: "0 14px",
              fontSize: "small",
              backgroundColor: "white",
              color: "black",
            }}
          >
            Chart
          </div>
        )}
        {cdata === "mybetHistorys" ? (
          <div
            id="My_bet"
            className={style.historyCommon}
            onClick={() => {
              changeData("mybetHistorys");
            }}
            style={{
              width: "100px",
              marginLeft: "12px",
              textAlign: "center",
              fontSize: "small",
              backgroundColor: "orange",
              color: "white",
            }}
          >
            My history{" "}
          </div>
        ) : (
          <div
            id="My_bet"
            className={style.historyCommon}
            onClick={() => {
              changeData("mybetHistorys");
            }}
            style={{
              width: "100px",
              marginLeft: "12px",
              textAlign: "center",
              fontSize: "small",
              backgroundColor: "white",
              color: "black",
            }}
          >
            My history{" "}
          </div>
        )}
      </div>
      {tab == "serverhistory" && (
        <div className={style.DataHeader}>
          <div
            id="period"
            className={style.DataHeadersSecond}
            style={{
              width: "39%",
              textAlign: "left",
              fontSize: "15px",
              paddingLeft: "10px",
            }}
          >
            <b>Period</b>
          </div>
          <div
            id="number"
            className={style.DataHeadersSecond}
            style={{ fontSize: "15px" }}
          >
            <b>Number</b>
          </div>
          <div
            id="big_small"
            className={style.DataHeadersSecond}
            style={{
              width: "25%",
              textAlign: "center",
              fontSize: "15px",
            }}
          >
            <b>size</b>
          </div>
          <div
            id="color"
            className={style.DataHeadersSecond}
            style={{ textAlign: "center", fontSize: "15px" }}
          >
            <b>Color</b>
          </div>
        </div>
      )}
      {tab === "serverhistory" ? (
        WingoServerData30s.map((item) => (
          <div className={style.gameHistoryData}>
            <div className={style.DataHolder}>
              <div
                className={style.data}
                style={{ width: "38%", fontSize: "18px", paddingTop: "5px" }}
              >
                {item.period}
              </div>
              <div
                className={style.data}
                style={{
                  textAlign: "center",
                  width: "22%",
                  fontSize: "25px",

                  padding: "0",
                }}
              >
                <p
                  style={
                    Number(item.number) == 5
                      ? {
                          backgroundClip: "text",
                          color: "transparent",
                          backgroundImage:
                            "linear-gradient(180deg, green, violet, transparent)",
                          fontWeight: "bold",
                        }
                      : Number(item.number) == 0
                      ? {
                          backgroundClip: "text",
                          color: "transparent",
                          backgroundImage:
                            "linear-gradient(180deg, red , violet,transparent)",
                          fontWeight: "bold",
                        }
                      : Number(item.number) % 2 == 0
                      ? { color: "red", fontWeight: "bold" }
                      : { color: "#18b660", fontWeight: "bold" }
                  }
                >
                  {item.number}
                </p>
              </div>
              <div
                className={style.data}
                style={{ width: "24%", fontSize: "17px" }}
              >
                {item.size}
              </div>
              <div
                className={style.data}
                style={{
                  width: "40px",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                <div>
                  {item.color === "red" ? (
                    <img
                      className={style.Colorres}
                      src={red}
                      style={{ marginLeft: "12px" }}
                    />
                  ) : item.color === "green" ? (
                    <img
                      src={green}
                      style={{ marginLeft: "12px", height: "14px" }}
                    />
                  ) : item.color === "redViolet" ? (
                    <img
                      src={redVilet}
                      style={{ width: "40px", height: "16px" }}
                    />
                  ) : (
                    item.color === "greenViolet" && (
                      <img
                        src={greenViolet}
                        style={{ width: "40px", height: "16px" }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : tab === "chart" ? (
        <Nodata msg="No chart found" />
      ) : tab === "mybetHistorys" && Wingouserbethistory30sec.length > 0 ? (
        Wingouserbethistory30sec.map((item) => (
          <UserbetHistorycard data={item} />
        ))
      ) : (
        <Nodata msg="No bet found" />
      )}
      {/* option selector */}
      <div className={BetTab == "on" ? style.betSelector : style.bettaboff}>
        <div
          className={style.SelectionInfo}
          style={
            selection == "small"
              ? { backgroundColor: "#6ea8f4" }
              : selection == "Big"
              ? { backgroundColor: "orange" }
              : selection == "green"
              ? { backgroundColor: "#18b660" }
              : selection == "violet"
              ? { backgroundColor: "violet" }
              : selection == "red"
              ? { backgroundColor: "red" }
              : selection == 0
              ? { backgroundImage: "linear-gradient(to right,red, violet)" }
              : selection == 5
              ? { backgroundImage: "linear-gradient(to right, green,violet)" }
              : selection % 2 == 0
              ? { backgroundColor: "red" }
              : selection % 2 !== 0 && { backgroundColor: "#18b660" }
          }
        >
          <p className={style.Selectorheading}>Wingo 30s</p>
          <div className={style.Selectedoption}>
            <p>
              <span style={{ marginRight: "10px" }}>Select</span> {selection}
            </p>
          </div>
        </div>
        <div className={style.firsttab}>
          <div className={style.section}>
            <p style={{ paddingLeft: "10%", fontSize: "20px" }}>Balance</p>
          </div>
          <div className={style.section}>
            <span
              className={
                balanceSelection == 1
                  ? style.activeBalance
                  : style.InActiveBalance
              }
              onClick={() => {
                changeBalanceSelection(1);
              }}
              style={
                balanceSelection == 1
                  ? selection == "small"
                    ? { backgroundColor: "#6ea8f4" }
                    : selection == "Big"
                    ? { backgroundColor: "orange" }
                    : selection == "violet"
                    ? { backgroundColor: "violet" }
                    : selection == "red"
                    ? { backgroundColor: "red" }
                    : selection == 0
                    ? { backgroundColor: "red" }
                    : selection == 5
                    ? { backgroundColor: "green" }
                    : selection % 2 == 0
                    ? { backgroundColor: "red" }
                    : selection % 2 !== 0
                    ? { backgroundColor: "#18b660" }
                    : {}
                  : {}
              }
            >
              1
            </span>
            <span
              className={
                balanceSelection == 10
                  ? style.activeBalance
                  : style.InActiveBalance
              }
              onClick={() => {
                changeBalanceSelection(10);
              }}
              style={
                balanceSelection == 10
                  ? selection == "small"
                    ? { backgroundColor: "#6ea8f4" }
                    : selection == "Big"
                    ? { backgroundColor: "orange" }
                    : selection == "green"
                    ? { backgroundColor: "#18b660" }
                    : selection == "violet"
                    ? { backgroundColor: "violet" }
                    : selection == "red"
                    ? { backgroundColor: "red" }
                    : selection == 0
                    ? { backgroundColor: "red" }
                    : selection == 5
                    ? { backgroundColor: "green" }
                    : selection % 2 == 0
                    ? { backgroundColor: "red" }
                    : selection % 2 !== 0
                    ? { backgroundColor: "#18b660" }
                    : {}
                  : {}
              }
            >
              10
            </span>
            <span
              className={
                balanceSelection == 100
                  ? style.activeBalance
                  : style.InActiveBalance
              }
              onClick={() => {
                changeBalanceSelection(100);
              }}
              style={
                balanceSelection == 100
                  ? selection == "small"
                    ? { backgroundColor: "#6ea8f4" }
                    : selection == "Big"
                    ? { backgroundColor: "orange" }
                    : selection == "green"
                    ? { backgroundColor: "#18b660" }
                    : selection == "violet"
                    ? { backgroundColor: "violet" }
                    : selection == "red"
                    ? { backgroundColor: "red" }
                    : selection == 0
                    ? { backgroundColor: "red" }
                    : selection == 5
                    ? { backgroundColor: "green" }
                    : selection % 2 == 0
                    ? { backgroundColor: "red" }
                    : selection % 2 !== 0
                    ? { backgroundColor: "#18b660" }
                    : {}
                  : {}
              }
            >
              100
            </span>
            <span
              className={
                balanceSelection == 1000
                  ? style.activeBalance
                  : style.InActiveBalance
              }
              onClick={() => {
                changeBalanceSelection(1000);
              }}
              style={
                balanceSelection == 1000
                  ? selection == "small"
                    ? { backgroundColor: "#6ea8f4" }
                    : selection == "Big"
                    ? { backgroundColor: "orange" }
                    : selection == "green"
                    ? { backgroundColor: "#18b660" }
                    : selection == "violet"
                    ? { backgroundColor: "violet" }
                    : selection == "red"
                    ? { backgroundColor: "red" }
                    : selection == 0
                    ? { backgroundColor: "red" }
                    : selection == 5
                    ? { backgroundColor: "green" }
                    : selection % 2 == 0
                    ? { backgroundColor: "red" }
                    : selection % 2 !== 0
                    ? { backgroundColor: "#18b660" }
                    : {}
                  : {}
              }
            >
              1000
            </span>
          </div>
        </div>
        <div className={style.SecondTab}>
          <div className={style.section}>
            <p style={{ paddingLeft: "10%" }}>Quantity</p>
          </div>
          <div className={style.sectionfx}>
            <span
              className={style.iconify}
              style={
                selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
              }
              onClick={() => {
                if (quantity > 0) {
                  changeQuantity(quantity - 1);
                }
              }}
            >
              -
            </span>

            <input
              type="number"
              value={quantity}
              className={style.specialInput}
              onChange={(e) => {
                if (e.target.value > 0) {
                  changeQuantity(e.target.value);
                }
              }}
            />

            <span
              className={style.iconify}
              style={
                selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
              }
              onClick={() => {
                changeQuantity(quantity + 1);
              }}
            >
              +
            </span>
          </div>
        </div>
        <div className={style.thirdTab}>
          <span
            className={
              MultiplierSelection == 1
                ? style.activeBalance
                : style.InActiveBalance
            }
            onClick={() => {
              changeMultiplierSelection(1);
            }}
            style={
              MultiplierSelection == 1
                ? selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
                : {}
            }
          >
            X1
          </span>
          <span
            className={
              MultiplierSelection == 5
                ? style.activeBalance
                : style.InActiveBalance
            }
            onClick={() => {
              changeMultiplierSelection(5);
            }}
            style={
              MultiplierSelection == 5
                ? selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
                : {}
            }
          >
            X5
          </span>
          <span
            className={
              MultiplierSelection == 10
                ? style.activeBalance
                : style.InActiveBalance
            }
            onClick={() => {
              changeMultiplierSelection(10);
            }}
            style={
              MultiplierSelection == 10
                ? selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
                : {}
            }
          >
            X10
          </span>
          <span
            className={
              MultiplierSelection == 20
                ? style.activeBalance
                : style.InActiveBalance
            }
            onClick={() => {
              changeMultiplierSelection(20);
            }}
            style={
              MultiplierSelection == 20
                ? selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
                : {}
            }
          >
            X20
          </span>
          <span
            className={
              MultiplierSelection == 50
                ? style.activeBalance
                : style.InActiveBalance
            }
            onClick={() => {
              changeMultiplierSelection(50);
            }}
            style={
              MultiplierSelection == 50
                ? selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
                : {}
            }
          >
            X50
          </span>{" "}
          <span
            className={
              MultiplierSelection == 100
                ? style.activeBalance
                : style.InActiveBalance
            }
            onClick={() => {
              changeMultiplierSelection(100);
            }}
            style={
              MultiplierSelection == 100
                ? selection == "small"
                  ? { backgroundColor: "#6ea8f4" }
                  : selection == "Big"
                  ? { backgroundColor: "orange" }
                  : selection == "green"
                  ? { backgroundColor: "#18b660" }
                  : selection == "violet"
                  ? { backgroundColor: "violet" }
                  : selection == "red"
                  ? { backgroundColor: "red" }
                  : selection == 0
                  ? { backgroundColor: "red" }
                  : selection == 5
                  ? { backgroundColor: "green" }
                  : selection % 2 == 0
                  ? { backgroundColor: "red" }
                  : selection % 2 !== 0
                  ? { backgroundColor: "#18b660" }
                  : {}
                : {}
            }
          >
            X100
          </span>
        </div>
        <div className={style.submittab}>
          <button
            onClick={() => {
              changeBetTab("no");
              changeBalanceSelection(1);
              changeMultiplierSelection(1);
              changeQuantity(1);
            }}
          >
            Cancel
          </button>
          <button
            style={
              selection == "small"
                ? { backgroundColor: "#6ea8f4" }
                : selection == "Big"
                ? { backgroundColor: "orange" }
                : selection == "green"
                ? { backgroundColor: "#18b660" }
                : selection == "violet"
                ? { backgroundColor: "violet" }
                : selection == "red"
                ? { backgroundColor: "red" }
                : selection == 0
                ? { backgroundColor: "red" }
                : selection == 5
                ? { backgroundColor: "green" }
                : selection % 2 == 0
                ? { backgroundColor: "red" }
                : selection % 2 !== 0
                ? { backgroundColor: "#18b660" }
                : {}
            }
            onClick={() => {
              let date = new Date();
              let sec = currentsec;
              let year = date.getFullYear();
              let month = date.getMonth() + 1;
              let day = date.getDate();
              let hour = date.getHours();
              let min = currentmin + 1;
              let amount = balanceSelection * quantity * MultiplierSelection;
              let game = "wingo";
              let time = "30sec";
              // generate new random int between 0 and 9
              let period = `${year}${month}${day}${hour == 0 ? `00` : hour}${
                min == 0 ? `60` : min < 10 ? "0" + min : min
              }${currentsec >= 30 ? 2 : 1}`;
              let packet = { uid, game, time, period, selection, amount };

              if (sec <= 5) {
                alert("betting time is over");
                changeBetTab("off");
              } else {
                if (amount > userfinance.balance) {
                  alert("err bet not set low account balance please ad funds");
                  changeBetTab("off");
                } else {
                  setWingo30secbet(packet, setShowLoader);
                  changeBalanceSelection("1");
                  changeMultiplierSelection(" 1");
                  changeQuantity("1");
                  changeBetTab("off");
                }
              }
            }}
          >
            Total amount {balanceSelection * quantity * MultiplierSelection}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wingo30sec;
