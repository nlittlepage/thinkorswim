declare lower;

input price = close;
input EMAlength = 63;
input RSIlength = 21;
input RSIaverageType = AverageType.WILDERS;

plot sixty = 60;
sixty.SetDefaultColor(Color.ORANGE);
sixty.HideBubble();

plot fourty = 40;
fourty.SetDefaultColor(Color.ORANGE);
fourty.HideBubble();

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
