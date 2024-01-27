# 오늘의 목표는? 기하!
- 챕터12. p.571 ~ 590

## 기하 알고리즘(기하학적 도형 알고리즘)
- 기하 알고리즘은 거의 모두 기하학적 성질(CCW)을 통해 풀 수 있다!
- CCW에 대해 알아보고 몇 가지 문제를 풀어보자.

# 기하 : CCW

### 기하의 핵심이론

CCW(Counter-ClockWise)는 평면 상의 3개의 점과 관련된 점들의 위치 관계를 판단하는 알고리즘

### CCW의 아이디어: 외적

두 3차원 벡터의 외적을 생각해보자.

$$
\vec{v} = (n_1,\ n_2,\ n_3),\ \vec{v} = (n_1,\ n_2,\ n_3)
$$

$$
\vec{u}\times\vec{v} = \begin{vmatrix}\hat{i}&\hat{j}&\hat{k}\\m_1&m_2&m_3\\n_1&n_2&n_3\end{vmatrix} = \begin{vmatrix}m_2&m_3\\n_2&n_3\end{vmatrix}\hat{i} - \begin{vmatrix}m_1&m_3\\n_1&n_3\end{vmatrix}\hat{j} + \begin{vmatrix}m_1&m_2\\n_1&n_2\end{vmatrix}\hat{k}
$$

만약 두 벡터가 모두 xy평면 상의 벡터라면 그 결과는 다음과 같다.

$$
\vec{u}\times\vec{v} = (0,\ 0,\ m_1n_2-m_2n_1)
$$

이를 통해 z축에 생긴 법선 벡터를 얻을 수 있고, 그 값은 두 벡터의 방향 관계에 따라 

반시계 방향이면 양수, 시계 방향이면 음수이다.

또한 외적의 크기는 z 성분의 절대값과 같고 이는 두 벡터로 만들어진 평행사변형의 크기와 같다.
