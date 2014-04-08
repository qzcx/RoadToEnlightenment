package route.user;

import model.facade.UtilFacade;
import route.CoreRoute;
import server.Server;
import spark.Request;
import spark.Response;
import spark.Route;
import comm.request.UserRequest;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;


public class LoginRoute extends CoreRoute {

    private UtilFacade m_utilFacade;


    public LoginRoute(UtilFacade gamesFacade) {
        m_utilFacade = gamesFacade;
    }

    @Override
    public void attach() {
        post(new Route("/user/login") {
            @Override
            public Object handle(Request request, Response response) {

                String username = request.queryParams("username");
                String password = request.queryParams("password");

                if (username == null || password == null){
                  response.status(401);
                  return("Failed to login - invalid username or password.");
                }

                UserRequest userRequest = new UserRequest(username, password);
                boolean modelResponse = m_utilFacade.onUserLogin(userRequest);
                if(modelResponse){
                    int id = m_utilFacade.getUserId(username, password);
                    response.status(200);
                    String uriCookie = Server.createUserCookie(username,password, id);
                    response.header("Set-cookie","catan.user="+uriCookie+";Path=/;");
                    //addCookie(response, "catan.user", test);
                    addCookie(response, "catan.username", username);
                    return "";
                }
                else{
                    response.status(401);
                    return ("Failed to login - bad username or password.");
                }
            }
        });
    }
}
