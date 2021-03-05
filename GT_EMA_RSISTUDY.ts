#
# TD Ameritrade IP Company, Inc. (c) 2007-2019
# Tweaked by @korygill
# https://usethinkscript.com/d/185-moving-average-crossover-rsi-indicator-for-thinkorswim
# Further Tweaked by @Grunt_Trader to reflect:
# "Trend Following Algorithms for Technical Trading in Stock Market" (c) 2011

declare lower;

input length = 63;
input over_Bought = 60;
input over_Sold = 40;
input price = close;
input averageType = AverageType.WILDERS;
input showBreakoutSignals = no;
input rsiMALength = 21; #hint rsiMALength: RSI Moving Average Length
input rsiAverageType = AverageType.EXPONENTIAL;

def NetChgAvg = MovingAverage(averageType, price - price[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(price - price[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

plot RSI = 50 * (ChgRatio + 1);
plot OverSold = over_Sold;
plot OverBought = over_Bought;

# plot the RSI Moving Average
def rsiMA = MovingAverage(rsiAverageType, RSI, rsiMALength);
plot prsiMA = rsiMA;
prsiMA.SetDefaultColor(Color.GREEN);
prsiMA.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);

plot UpSignal = if RSI crosses above prsiMA and RSI is less than OverSold then prsiMA else Double.NaN;
plot DownSignal = if RSI crosses below prsiMA and RSI is greater than OverBought then prsiMA else Double.NaN;


UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

RSI.DefineColor("OverBought", GetColor(5));
RSI.DefineColor("Normal", GetColor(7));
RSI.DefineColor("OverSold", GetColor(1));
RSI.AssignValueColor(if RSI > over_Bought then RSI.color("OverBought") else if RSI < over_Sold then RSI.color("OverSold") else RSI.color("Normal"));
RSI.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);
OverSold.SetDefaultColor(GetColor(8));
OverBought.SetDefaultColor(GetColor(8));
UpSignal.SetDefaultColor(Color.WHITE);
UpSignal.SetLineWeight(4);
UpSignal.SetPaintingStrategy(PaintingStrategy.POINTS);
DownSignal.SetDefaultColor(Color.WHITE);
DownSignal.SetLineWeight(4);
DownSignal.SetPaintingStrategy(PaintingStrategy.POINTS);