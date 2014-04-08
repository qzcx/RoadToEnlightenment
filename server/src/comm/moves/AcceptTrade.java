package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import modelInterfaces.base.Game;
import modelInterfaces.base.GameInfo;
import modelInterfaces.base.TradeOffer;
import modelInterfaces.base.Resources;

import java.io.IOException;

/**
 * Created by: film42 on: 3/13/14.
 */
public class AcceptTrade extends Command {

    private boolean willAccept;

    public boolean willAccept() {
        return willAccept;
    }

    @Override
    public String getLogMessage() {
		if (willAccept)
			return " accepted the trade";
		else
			return " refused the trade";
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {
        super.execute(gameInfo);
        Game game = gameInfo.getData();
        TradeOffer tradeOffer = game.getTradeOffer();
        Resources resourcesOffer = tradeOffer.getResourcesOffer();

        if (willAccept){

            Resources resourcesSender = game.getPlayerByIndex(tradeOffer.getSender()).getResources();
            Resources resourcesReceiver = game.getPlayerByIndex(tradeOffer.getReceiver()).getResources();

            for (String type : Resources.TYPES) {

                int num = resourcesOffer.getResourceByString(type);
                if(num > 0){ // resource offered

                    resourcesSender.setResourceByString(type, (resourcesSender.getResourceByString(type) - num));
                    resourcesReceiver.setResourceByString(type,(resourcesReceiver.getResourceByString(type) + num));
                }

                else if (num < 0){ //resource asked for
                    resourcesSender.setResourceByString(type,(resourcesSender.getResourceByString(type) + Math.abs(num)));
                    resourcesReceiver.setResourceByString(type,(resourcesReceiver.getResourceByString(type) - Math.abs(num)));
                }
            }

        }

		game.setTradeOffer(null);
        gameInfo.setData(game);
    }

}
