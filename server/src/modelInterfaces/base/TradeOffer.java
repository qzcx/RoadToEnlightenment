package modelInterfaces.base;

/**
 * Created by klu on 3/22/14.
 */
public interface TradeOffer {


    public abstract void setSender(int sender);

    public abstract int getSender();

    public abstract void setReceiver(int receiver);

    public abstract int getReceiver();

    public abstract void setResourceOffer(Resources tradeOffer);

    public abstract Resources getResourcesOffer();


}
