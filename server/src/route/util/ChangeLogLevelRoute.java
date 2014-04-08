package route.util;

import model.facade.UtilFacade;
import route.CoreRoute;
import spark.Request;
import spark.Response;
import spark.Route;
import comm.request.ChangeLogLevelRequest;
/**
 * Created by Jon George on 3/6/14.
 */
public class ChangeLogLevelRoute extends CoreRoute {
    private UtilFacade m_utilFacade;
    public ChangeLogLevelRoute(UtilFacade gamesFacade) {
        m_utilFacade = gamesFacade;
    }
    @Override
    public void attach() {
        post(new Route("/util/changeLogLevel") {
            @Override
            public Object handle(Request request, Response response) {
                String logLevel = request.params("logLevel");
                if (logLevel == null){
                    return("Invalide Log Level");
                }
                ChangeLogLevelRequest changeLogLevelRequest = new ChangeLogLevelRequest(logLevel);
                boolean modelResponse = m_utilFacade.onChangeLogLevel(changeLogLevelRequest);
                if(modelResponse){
                  //default return HTTP_OK
                  response.status(200);
                  return("Util Changed Log Level Test");
                }
                else{
                    response.status(401);
                    return("Failed to Change Log Level Test");
                }
               
            }
        });
    }
}
