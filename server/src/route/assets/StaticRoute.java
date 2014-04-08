package route.assets;

import route.CoreRoute;
import route.Routable;
import spark.Request;
import spark.Response;
import spark.Route;

public class StaticRoute extends CoreRoute {

    @Override
    public void attach() {
        get(new Route("/*") {
            @Override
            public Object handle(Request request, Response response) {
                String url = request.url();
                return "We will soon serve: " + url;
            }
        });
    }

}
