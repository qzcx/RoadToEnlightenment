package comm.moves;

import comm.moves.base.Command;
import comm.moves.base.InvalidCommandException;
import comm.moves.form.CardDeck;
import model.InjectorFactory;
import model.ModelModule;
import model.base.TradeOfferImpl;
import modelInterfaces.base.*;

import java.io.IOException;

/**
 * Created by: film42 on: 3/13/14.
 */
public class TradeOfferCommand extends Command {

    private CardDeck offer;

    private int receiver;

    public Resources getOffer() {
        return offer;
    }

    public int getReceiver() {
        return receiver;
    }

    @Override
    public String getLogMessage() {
        return " offered a trade";
    }

    @Override
    public void execute(GameInfo gameInfo) throws IOException, InvalidCommandException {

        super.execute(gameInfo);
        Game game = gameInfo.getData();
		TradeOffer newTradeOffer = InjectorFactory.getInjector().getInstance(TradeOffer.class);
		newTradeOffer.setReceiver(getReceiver());
		newTradeOffer.setSender(getPlayerIndex());
		newTradeOffer.setResourceOffer(offer);
		game.setTradeOffer(newTradeOffer);

        gameInfo.setData(game);
    }
}
