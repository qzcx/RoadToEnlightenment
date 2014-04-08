package model;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Module;

/**
 * Created by Jon George on 3/13/14.
 */
public class InjectorFactory {
    private static Injector injector;
    private static Module currentModule;


    /**
     * The idea behind this method is to allow you to change out the Module
     * if needed
     * @param module
     * @return
     */
    public static Injector createInjector(Module module){
		if (injector == null || currentModule == null || !(module.getClass().equals(currentModule.getClass()))) {
            injector = Guice.createInjector(module);
        }
        return injector;
    }

    public static Injector getInjector(){
        //check if injector is defined already
		assert (injector != null);

        return injector;
    }
}
