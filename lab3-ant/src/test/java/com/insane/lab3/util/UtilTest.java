package com.insane.lab3.util;

import org.junit.jupiter.api.RepeatedTest;
import org.junit.jupiter.api.Test;

import com.insane.lab3.util.ResponseManager;
import static org.junit.jupiter.api.Assertions.assertSame;

public class UtilTest {
    @Test
    public void testPoint() {
        assertSame("Success", ResponseManager.answer(0, 0,0));
    }
}
