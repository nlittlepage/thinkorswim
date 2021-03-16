## Copyright (c) 2015 - 2021 Hex Ventures, LLC ##

declare lower;

input price = close;
input EMAlength = 63;
input RSIlength = 21;
input RSIaverageType = AverageType.WILDERS;

plot ob = 70;
ob.SetDefaultColor(Color.ORANGE);
ob.HideBubble();

plot os = 30;
os.SetDefaultColor(Color.ORANGE);
os.HideBubble();

plot ml = 50;
ml.SetDefaultColor(Color.ORANGE);
ml.SetPaintingStrategy(PaintingStrategy.DASHES);
ml.HideBubble();

def NetChgAvg = MovingAverage(RSIaverageType, price - price[1], RSIlength);
def TotChgAvg = MovingAverage(RSIaverageType, AbsValue(price - price[1]), RSIlength);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

plot RSI = 50 * (ChgRatio + 1);
plot EMARSI = ExpAverage(RSI, EMAlength);

RSI.AssignValueColor( if RSI > EMARSI then Color.GREEN else Color.RED);
RSI.HideBubble();
EMARSI.SetDefaultColor(Color.WHITE);
EMARSI.HideBubble();

AddCloud(RSI, EMARSI, Color.DARK_GREEN, Color.DARK_RED);

#Alert( RSI crosses above EMARSI and EMARSI > fourty and EMARSI < sixty, "XU", alert.BAR, sound.Ding);
#Alert( RSI crosses below EMARSI and EMARSI > fourty and EMARSI < sixty, "XD", alert.Bar, sound.Chimes); 
