package model.base;

import com.google.inject.Inject;
import comm.moves.form.CardDeck;
import model.JsonImpl;
import modelInterfaces.base.Resources;


/**
 * Created by klu on 3/22/14.
 */
public class TradeOfferImpl extends JsonImpl implements modelInterfaces.base.TradeOffer{
   private int sender;
   private int receiver;
	private Resources offer;


    @Override
    public void setSender(int sender) {
        this.sender = sender;

    }

    @Override
    public int getSender() {
        return sender;
    }

    @Override
    public void setReceiver(int receiver) {
		this.receiver = receiver;
    }

    @Override
    public int getReceiver() {
        return receiver;
    }

    @Override
    public void setResourceOffer(Resources tradeOffer) {
		this.offer = tradeOffer;

    }

    @Override
    public Resources getResourcesOffer() {
		return this.offer;
    }
}
