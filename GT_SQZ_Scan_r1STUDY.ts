## Copyright (c) 2019 - 2021 Hex Ventures, LLC ##

input price = CLOSE;
input length = 21;
input nK = 1.5;
input nBB = 2.0;
input alertLine = 1.0;
def squeezeDots = TTM_Squeeze(price, length, nK, nBB, alertLine).SqueezeAlert;
def alertCount = if squeezeDots[1] == 0 and squeezeDots == 1 then 1 else if squeezeDots == 1 then alertCount[1] + 1 else 0;
plot data = alertCount;
data.AssignValueColor(if alertCount >= 4 then Color.ORANGE else if alertCount <= 3 then Color.BLACK else Color.WHITE);
AssignBackgroundColor(if alertCount == 0 then Color.DARK_RED else if alertCount <= 3 then Color.YELLOW else if alertcount >= 21 then Color.DARK_GREEN else Color.BLACK);