package route;

import spark.Route;

/**
 * Created by film42 on 3/6/14.
 */
public interface Routable {

    public void attach();

    public void get(Route route);

    public void post(Route route);

}
