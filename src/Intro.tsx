import { IOpsSdk } from "@deliveryhero/opsportal";
import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Grid, GridItem, Typography, Link } from '@deliveryhero/armor';
import WelcomeIllustration from "@src/WelcomeIllustration";
import { FileCommonTextIcon } from '@deliveryhero/armor-icons'
import { useGetSummarizedDataQuery } from "./modules/graphql/getSummarizedData.generated";

const Intro: React.FC<{ baseApi: IOpsSdk }> = ({ baseApi }) => {
    const name = baseApi.getUserName();

    // TODO: remove this sample usage call
    const { data, loading, error } = useGetSummarizedDataQuery({
        variables: {
            filter: {
                startDate: "",
                endDate: "",
            }
        },
        onCompleted: (data) => {
            console.log(data);
        }
    });

    const { t } = useTranslation();

    return (
        <>
            <Container maxWidth="lg" paddingX={10} paddingY={4}>
                <Typography pageTitle>
                    {t('Welcome, {{name}}!', { name })}
                </Typography>
            </Container>
            <Divider horizontal />
            <Container maxWidth="lg" paddingX={10} paddingY={4}>
                <Grid>
                    <GridItem xs={12} md={6}>
                        <Typography paragraph>
                            {t('This is the default development plugin, here to get you started hacking.')}
                        </Typography>
                        <Typography paragraph>
                            <Link underline href="https://github.com/deliveryhero/dh-platform-ops-portal">
                                <FileCommonTextIcon marginRight={2} marginLeft={8} />
                                Ops Portal repository
                            </Link>
                        </Typography>
                        <Typography paragraph>
                            <Link underline href="https://ops-portal-docs.deliveryhero.io">
                                <FileCommonTextIcon marginRight={2} marginLeft={8} />
                                Ops Portal Plugin SDK
                            </Link>
                        </Typography>
                        <Typography paragraph>
                            <Link underline href="https://github.com/deliveryhero/armor">
                                <FileCommonTextIcon marginRight={2} marginLeft={8} />
                                Armor design system repository
                            </Link>
                        </Typography>
                        <Typography paragraph>
                            <Link underline href="https://github.com/deliveryhero/dh-vt-ops-portal-hello-world-plugin">
                                <FileCommonTextIcon marginRight={2} marginLeft={8} />
                                Hello World plugin repository
                            </Link>
                        </Typography>
                    </GridItem>
                    <GridItem paddingX={30} xs={12} md={6}>
                        <WelcomeIllustration color="primary.main" width="264px" />
                    </GridItem>
                </Grid>
            </Container>
        </>
    )
};

export default Intro;
